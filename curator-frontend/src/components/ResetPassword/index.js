/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";

//images
import eye from "assets/images/eye.svg";
import keySquare from "assets/images/key-square.svg";

import SimpleReactValidator from "simple-react-validator";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Toast } from "utils/Toast";
import { NormalInputIcon } from "components/common/typography/input-icon";
import { NormalButton } from "components/common";

export const ResetPassword = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, forceUpdate] = useState();

  const simpleValidator = useRef(
    new SimpleReactValidator({
      className: "error-message",
    })
  );

  const handleReset = () => {
    try {
      const formValid = simpleValidator.current.allValid();
      if (formValid) {
        Auth.forgotPasswordSubmit(state, code, password)
          .then((data) => {
            Toast("success", "Password reset successfully");
            navigate("/auth/login");
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
        <h2 className="title lato-medium-black-34px">Reset Password</h2>
      </div>
      <div className="form">
        <div className="form-group">
          <NormalInputIcon
            label="Code"
            image={keySquare}
            type="text"
            name="Code"
            placeholder="Code"
            value={code}
            onChange={(e) => {
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setCode(e.target.value);
              }
            }}
            errorMessage={simpleValidator.current.message(
              "Code",
              code,
              "required"
            )}
          />
        </div>
        <div className="form-group">
          <NormalInputIcon
            label="New password"
            image={keySquare}
            type="password"
            name="npassword"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={simpleValidator.current.message(
              "Password",
              password,
              "required"
            )}
            rightIcon={eye}
            rightIconClick={(e) => {
              e.preventDefault();
              let type = document.getElementById("npassword").type;
              document.getElementById("npassword").type =
                type === "password" ? "text" : "password";
            }}
          />
        </div>
        <div className="form-group">
          <NormalInputIcon
            label="Confirm password"
            image={keySquare}
            type="password"
            name="cpassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            errorMessage={simpleValidator.current.message(
              "Confirm Password",
              confirmPassword,
              `required|in:${password}`,
              { messages: { in: "Passwords need to match!" } }
            )}
            rightIcon={eye}
            rightIconClick={(e) => {
              e.preventDefault();
              let type = document.getElementById("cpassword").type;
              document.getElementById("cpassword").type =
                type === "password" ? "text" : "password";
            }}
          />
        </div>
      </div>
      <div className="authentication-submit">
        <NormalButton
          label="Reset password"
          type="submit"
          onClick={handleReset}
        />
      </div>
    </>
  );
};
