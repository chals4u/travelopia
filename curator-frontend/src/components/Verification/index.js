import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { Toast } from "utils/Toast";
import { NormalButton, NormalInput } from "components/common";

//css
// import "./verification.css";

export const Verification = () => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30);
  const { state } = useLocation();

  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    timer >= 1 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const resetTimer = function () {
    if (!timer) {
      setTimer(30);
    }
  };

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const confirmSignUp = async () => {
    try {
      const email = state ? state : user?.user?.detail?.email;
      await Auth.confirmSignUp(email, code);
      navigate("/auth/verified");
    } catch (error) {
      Toast("error", error.message);
      console.log("error confirming sign up", error);
    }
  };
  return (
    <>
      <div className="authentication-form-title">
        <h2 className="title lato-medium-black-34px">Enter Code</h2>
      </div>
      <div className="form">
        <div className="form-group">
          <label>
            Enter the OTP sent to {state ? state : user?.user?.detail?.email}
          </label>
          <NormalInput
            type="text"
            id="email-address"
            placeholder="Email Code"
            value={code}
            onChange={(e) => {
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setCode(e.target.value);
              }
            }}
            inputClass="icon-form-control"
          />

          <p
            className={`text-end cursor otp mt-1 ${
              timer !== 0 && timer !== -1 && "pe-none text-muted"
            }`}
            onClick={async () => {
              resetTimer();
              await Auth.resendSignUp(state);
              Toast("success", "code resent successfully");
            }}
          >
            Resend OTP {timer !== 0 && timer !== -1 && `(${timer})`}
          </p>
        </div>
        <div className="authentication-submit">
          <NormalButton label="Verify" type="submit" onClick={confirmSignUp} />
        </div>
      </div>
    </>
  );
};
