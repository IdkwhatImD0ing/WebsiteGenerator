import Image from "next/image";

import TopBar from "./topbar";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* main */}
      <TopBar />
      <h1>Home Page</h1>
    </div>
  );
}
