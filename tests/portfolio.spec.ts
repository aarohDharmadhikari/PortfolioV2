import { expect, test, type Page } from "@playwright/test";

async function startCustomRequest(page: Page) {
  await page.goto("/services");
  await page.getByRole("button", { name: /Custom request/ }).click();
  await page.getByLabel("Describe your request").fill("Build an accessible portfolio website.");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByRole("button", { name: "Send verification code" }).click();
  await expect(page.getByLabel("Verification code", { exact: true })).toBeVisible();
}

test("all navigation links resolve and the mobile menu closes", async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const routes = [
    ["Projects", "/projects"],
    ["Experience", "/experience"],
    ["Services", "/services"],
    ["Contact", "/contact"],
    ["Home", "/"],
  ] as const;
  for (const [name, route] of routes) {
    if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
    const nav = page.getByRole("navigation", { name: isMobile ? "Mobile" : "Primary", exact: true });
    await nav.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(route);
    await expect(page.locator("main h1")).toBeVisible();
    if (isMobile) await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile", exact: true }).getByRole("link", { name: "Home", exact: true }).click();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("project filters and case study links work", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "Web", exact: true }).click();
  await expect(page.getByRole("link", { name: "REPOGRAPH", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ahirani Speech-to-Text", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "AI / ML", exact: true }).click();
  await page.getByRole("link", { name: "Ahirani Speech-to-Text", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ahirani Speech-to-Text");
  const response = await page.goto("/projects/does-not-exist");
  expect(response?.status()).toBe(404);
});

test("contact form validates and completes a simulated send", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message (simulated)", exact: true }).click();
  await expect(page.getByText("Name is required.")).toBeVisible();
  await expect(page.getByText("Enter your email address.")).toBeVisible();
  await expect(page.getByText("Message is required.")).toBeVisible();
  await page.getByLabel("Name", { exact: true }).fill("Test User");
  await page.getByLabel("Email", { exact: true }).fill("invalid");
  await page.getByLabel("Message", { exact: true }).fill("Hello from the browser test.");
  await page.getByRole("button", { name: "Send message (simulated)", exact: true }).click();
  await expect(page.getByText("Enter a valid email, like name@example.com.")).toBeVisible();
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page.getByRole("button", { name: "Send message (simulated)", exact: true }).click();
  await expect(page.getByText("Simulated send complete")).toBeVisible();
  await page.getByRole("button", { name: "Write another" }).click();
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("");
});

test("service request validates details and handles verification states", async ({ page }) => {
  await page.goto("/services");
  await page.getByRole("button", { name: /Web application/ }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  const alert = page.getByRole("main").getByRole("alert");
  await expect(alert).toContainText("Scope is required.");
  await expect(alert).toContainText("Project description is required.");
  await page.getByLabel("MVP", { exact: true }).check();
  await page.getByLabel("Project description").fill("Build a dashboard.");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByRole("button", { name: "Send verification code" }).click();
  const code = page.getByLabel("Verification code", { exact: true });
  await code.fill("111111");
  await page.getByRole("button", { name: "Verify", exact: true }).click();
  await expect(alert).toContainText("Check it and try again.");
  await code.fill("000000");
  await page.getByRole("button", { name: "Verify", exact: true }).click();
  await expect(alert).toContainText("That code has expired.");
  await page.getByRole("button", { name: "Resend code" }).click();
  await expect(code).toHaveValue("");
  await code.fill("123456");
  await page.getByRole("button", { name: "Verify", exact: true }).click();
  await page.getByRole("button", { name: "Review request" }).click();
  await expect(page.locator("main dd").filter({ hasText: /^MVP$/ })).toBeVisible();
  await page.getByRole("button", { name: "Submit (simulated)", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Simulated submission complete" })).toBeVisible();
  await expect(page.getByText(/DEMO-/)).toBeVisible();
  await page.getByRole("button", { name: "Start another request" }).click();
  await expect(page.getByRole("heading", { name: "Choose a service" })).toBeVisible();
});

test("changing email during verification cannot verify the new address", async ({ page }) => {
  await startCustomRequest(page);
  await page.clock.install();
  await page.getByLabel("Verification code", { exact: true }).fill("123456");
  await page.getByRole("button", { name: "Verify", exact: true }).click();
  await page.getByLabel("Email address").fill("different@example.com");
  await page.clock.runFor(1000);
  await expect(page.getByRole("button", { name: "Review request" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Send verification code" })).toBeVisible();
  await expect(page.getByText("Email verified (simulated).")).toHaveCount(0);
});
