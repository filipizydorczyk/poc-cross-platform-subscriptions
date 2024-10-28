"use server";

import { ChromeBrowser } from "../lib/browser";

export default async function SubscriptionFetcher(props: { subs: string[] }) {
  const subs = props?.subs || [];
  let feed: {
    link: string;
    img: string;
  }[] = [];

  await Promise.all(
    subs.map(async (sub) => {
      const browser = new ChromeBrowser();
      await browser.init();
      const data = (await browser.fetchTheFeed(sub))?.filter((sub) => !!sub.img) || [];
      feed = [...feed, ...data];
      await browser.close();
    })
  );

  return (
    <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
      {feed.map((im, index) => (
        <a href={im.link} key={index} target="_blank">
          <img style={{ borderRadius: "1rem", cursor: "pointer" }} src={im.img} />
        </a>
      ))}
    </div>
  );
}
