import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    // <div className={styles.page}>
    <div style={{ width: "100%", height: "500px" }}>
      Add your subscriptions in <a href="/subscriptions">Subscriptions</a> tab and browser them in{" "}
      <a href="/feed">Feed</a> tab
    </div>
  );
}
