"use server";

import puppeteer from "puppeteer";

export default async function SubscriptionFetcher({ subs }: { subs: string[] }) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const images = await Promise.all(
    subs.map(async (sub) => {
      await page.goto(sub);

      const xd = await page.evaluate((sel) => document.querySelectorAll(sel), "a#thumbnail");
      const xd2 = await page.evaluate(() => document.images);

      const img = await page.screenshot({ encoding: "base64" });

      return img;
    })
  );

  await browser.close();
  return (
    <div>
      {images.map((im) => (
        <img src={`data:image/png;base64, ${im}`} />
      ))}
    </div>
  );
}
