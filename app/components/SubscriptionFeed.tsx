"use client";

import dynamic from "next/dynamic";
import { getSubs } from "../lib/storage";
// import SubscriptionFetcher from "./SubscriptionFetcher";

const SubscriptionFetcher = dynamic(() => import("./SubscriptionFetcher"));

export default function SubscriptionFeed() {
  const subs = getSubs();
  return <>{subs && <SubscriptionFetcher subs={subs} />}</>;
}
