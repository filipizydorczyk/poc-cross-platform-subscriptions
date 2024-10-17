const SUBSCRIPTION_KEY = "feed-url-list";

export const getSubs = () => {
  const stoarge = window.localStorage.getItem(SUBSCRIPTION_KEY);
  const listOfSubscriptions = stoarge ? (JSON.parse(stoarge) as string[]) : [];

  return listOfSubscriptions;
};

export const removeSub = (sub: string) => {
  const listOfSubscriptions = getSubs();
  if (sub) {
    window.localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(listOfSubscriptions.filter((item) => item !== sub)));
  }
};

export const addSub = (newItem: string) => {
  const listOfSubscriptions = getSubs();
  if (newItem) {
    window.localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify([...listOfSubscriptions, newItem]));
  }
};
