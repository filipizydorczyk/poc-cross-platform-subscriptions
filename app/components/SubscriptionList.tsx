"use client";

import { FormEvent, useEffect, useState } from "react";

const SUBSCRIPTION_KEY = "feed-url-list";

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  const getSubs = () => {
    const stoarge = window.localStorage.getItem(SUBSCRIPTION_KEY);
    const listOfSubscriptions = stoarge ? (JSON.parse(stoarge) as string[]) : [];

    return listOfSubscriptions;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const listOfSubscriptions = getSubs();
    const newItem = (e.currentTarget?.feedurl?.value as string) || "";
    if (newItem) {
      window.localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify([...listOfSubscriptions, newItem]));
      setSubscriptions(getSubs());
    }
    e.preventDefault();
  };

  const removeSub = (sub: string) => {
    const listOfSubscriptions = getSubs();
    if (sub) {
      window.localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(listOfSubscriptions.filter((item) => item !== sub)));
      setSubscriptions(getSubs());
    }
  };

  useEffect(() => {
    setSubscriptions(getSubs());
  }, []);

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
            {sub} <a onClick={() => removeSub(sub)}>Remove subscription</a>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
