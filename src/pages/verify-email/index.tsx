import React from "react";

const EmailVerificationMessage = () => {
  return (
    <div className="card">
      <h2>
        Verify your email {/* <span role="img" aria-label="email"> */}
        <span className="email-icon" role="img" aria-label="email">
          {" "}
          ✉️
        </span>
        {/* </span> */}
      </h2>
      <p>
        Reset password or Account activation link sent to your registered email
        address. Please follow the link inside to continue.
      </p>
    </div>
  );
};

EmailVerificationMessage.guestGuard = true;
export default EmailVerificationMessage;
