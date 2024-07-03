import React from "react";
import "@/styles/shared-styles.scss";

const Confirmation: React.FC = () => {
  return (
    <div className="container">
      <p>
        A verification email has been sent to your inbox. Please click the link
        in the email to verify your account.
      </p>
    </div>
  );
};

export default Confirmation;
