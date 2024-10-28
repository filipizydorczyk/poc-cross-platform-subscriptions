const SUBSCRIPTION_KEY = "feed-url-list";

export const getSubs = () => {
  const stoarge = window.localStorage.getItem(SUBSCRIPTION_KEY);
  const rawStorage = stoarge ? (JSON.parse(stoarge) as string[]) : [];
  const listOfSubscriptions = rawStorage.filter((sub) => sub.includes("youtube"));
  const invalidSubscriptions = rawStorage.filter((sub) => !sub.includes("youtube"));

  return { listOfSubscriptions, invalidSubscriptions };
};

export const removeSub = (sub: string) => {
  const { listOfSubscriptions, invalidSubscriptions } = getSubs();
  const subs = [...listOfSubscriptions, ...invalidSubscriptions];
  if (sub) {
    window.localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subs.filter((item) => item !== sub)));
  }
};

export const addSub = (newItem: string) => {
  const { listOfSubscriptions, invalidSubscriptions } = getSubs();
  const subs = [...listOfSubscriptions, ...invalidSubscriptions];
  if (newItem) {
    window.localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify([...subs, newItem]));
  }
};
