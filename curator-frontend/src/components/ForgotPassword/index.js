import React, { useRef, useState } from "react";
//svg
import sms from "assets/images/sms.svg";

import SimpleReactValidator from "simple-react-validator";

import { Toast } from "utils/Toast";

import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { NormalInputIcon } from "components/common/typography/input-icon";
import { NormalButton } from "components/common";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [, forceUpdate] = useState();

  const simpleValidator = useRef(
    new SimpleReactValidator({
      className: "error-message",
    })
  );

  const sendCode = async () => {
    try {
      const formValid = simpleValidator.current.allValid();
      if (formValid) {
        // Send confirmation code to user's email
        Auth.forgotPassword(email)
          .then((data) => {
            Toast("success", "Send confirmation code to your email");
            navigate("/auth/reset", { state: email });
          })
          .catch((err) => Toast("error", err.message));
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
    } catch (error) {
      Toast("error", error.message);
      console.log("error signing in", error);
    }
  };

  return (
    <>
      <div className="authentication-form-title">
        <h2 className="title lato-medium-black-34px">Forgot Password</h2>
      </div>
      <div className="form">
        <div className="form-group">
          <NormalInputIcon
            label="Email address"
            image={sms}
            type="email"
            name="email-address"
            placeholder="Email address"
            value={email}
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage={simpleValidator.current.message(
              "Email",
              email,
              "required|email"
            )}
          />
        </div>
        <div className="authentication-submit">
          <NormalButton
            label="Request reset"
            type="submit"
            onClick={sendCode}
          />
        </div>
      </div>
    </>
  );
};
