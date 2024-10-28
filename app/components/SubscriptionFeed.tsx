"use client";

import dynamic from "next/dynamic";
import { getSubs } from "../lib/storage";
import Loader from "./Loader";

const SubscriptionFetcher = dynamic(() => import("./SubscriptionFetcher"), {
  loading: () => <Loader />,
});

export default function SubscriptionFeed() {
  const { listOfSubscriptions, invalidSubscriptions } = getSubs();
  return (
    <article>
      <aside>
        <p>This subscriptions are not suported yet:</p>
        <ul>
          {invalidSubscriptions.map((sub) => (
            <li key={sub}>{sub}</li>
          ))}
        </ul>
      </aside>
      {listOfSubscriptions && <SubscriptionFetcher subs={listOfSubscriptions} />}
    </article>
  );
}
