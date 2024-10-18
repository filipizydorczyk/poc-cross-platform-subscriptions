"use client";

import dynamic from "next/dynamic";
import { getSubs } from "../lib/storage";
import Loader from "./Loader";

const SubscriptionFetcher = dynamic(() => import("./SubscriptionFetcher"), {
  loading: () => <Loader />,
});

export default function SubscriptionFeed() {
  const subs = getSubs();
  return <>{subs && <SubscriptionFetcher subs={subs} />}</>;
}
