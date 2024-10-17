"use client";

import { FormEvent, useState } from "react";
import { addSub, getSubs, removeSub } from "../lib/storage";

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState<string[]>(getSubs());

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const newItem = (e.currentTarget?.feedurl?.value as string) || "";
    addSub(newItem);
    setSubscriptions(getSubs());
    e.preventDefault();
  };

  const handleRemove = (sub: string) => {
    removeSub(sub);
    setSubscriptions(getSubs());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="feedurl">Url to subscribe to:</label>
        <input id="feedurl" name="feedurl" type="url" />
        <button type="submit">Subscribe</button>
      </form>
      <ul>
        {subscriptions.map((sub) => (
          <li key={sub}>
            {sub} <a onClick={() => handleRemove(sub)}>Remove subscription</a>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
