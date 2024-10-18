import dynamic from "next/dynamic";
import Loader from "../components/Loader";

const SubscriptionFeed = dynamic(() => import("../components/SubscriptionFeed"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Feed() {
  return (
    <>
      <SubscriptionFeed />
    </>
  );
}
