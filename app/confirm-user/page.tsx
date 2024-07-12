import React from "react";
import Link from "next/link";

import "@/styles/shared-styles.scss";

export default function ConfirmUser() {
  return (
    <div className="container">
      <div className="container__header">
        <h1>Email verified !</h1>
      </div>
      <Link href={"/"}>Back to the homepage</Link>
    </div>
  );
}
