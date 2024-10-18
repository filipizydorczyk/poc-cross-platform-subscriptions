// https://cssloaders.github.io/
import "./loader.css";

export default function Loader() {
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
      <div className="cmp-loader"></div>
    </div>
  );
}
