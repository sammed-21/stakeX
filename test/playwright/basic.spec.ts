import { test, expect } from "@playwright/test";
import basicSetup from "../wallet-setup/basic-setup";
import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";

const test = testWithSynpress(metaMaskFixtures(basicSetup));
const { expect } = test;

// test("has title", async ({ page }) => {
//   await page.goto("/");

//   // Expect a title "to contain" a substring.
//   // await expect(page).toHaveTitle(/);
// });

test("should show stake when wallet is connected", async ({
  page,
  context,
  metamaskPage,
  extensionId,
}) => {
  await page.goto("/");
  await expect(page.getByText("Connect Wallet")).toBeVisible();

  const metamast = new MetaMask(
    context,
    metamaskPage,
    extensionId,
    basicSetup.walletPassword
  );
});
