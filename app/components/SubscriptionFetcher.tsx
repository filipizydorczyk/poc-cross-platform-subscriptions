"use server";

import { ChromeBrowser } from "../lib/browser";

export default async function SubscriptionFetcher(props: { subs: string[] }) {
  const browser = new ChromeBrowser();
  const subs = props?.subs || [];
  let feed: string[] = [];

  await browser.init();
  const images = await Promise.all(
    subs.map(async (sub) => {
      const data = (await browser.fetchTheFeed(sub)) || [];
      feed = [...feed, ...data.map((dt) => dt.img)];
    })
  );

  await browser.close();
  return (
    <div>
      {feed.map((im, index) => (
        <img key={index} src={im} />
      ))}
    </div>
  );
}
