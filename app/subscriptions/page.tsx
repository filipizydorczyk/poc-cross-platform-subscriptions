import dynamic from "next/dynamic";
import Loader from "../components/Loader";

const SubscriptionList = dynamic(() => import("../components/SubscriptionList"), {
  ssr: false,
  loading: () => <Loader />,
});


export default function Subs() {
  return <SubscriptionList />;
}
