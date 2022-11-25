/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Auth } from "aws-amplify";

import SimpleReactValidator from "simple-react-validator";

//redux
import { useDispatch, useSelector } from "react-redux";

//svg
import sms from "assets/images/sms.svg";
import keySquare from "assets/images/key-square.svg";
import { Toast } from "utils/Toast";
import eye from "assets/images/eye.svg";

//actions
import { actions } from "redux/User/action";
import loaderAction from 'redux/Loader/action';
import { NormalInputIcon } from "components/common/input-icon";
import { NormalButton } from "components/common/button";
import { Circular } from 'components/Loader/circular';
const CustomSignin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, forceUpdate] = useState();
  const { networkProgressDialog: open } = useSelector((state) => state.loader);

  const simpleValidator = useRef(
    new SimpleReactValidator({
      className: "error-message",
    })
  );

  const signIn = async () => {
    try {
      const formValid = simpleValidator.current.allValid();
      if (formValid) {
        dispatch(loaderAction.startLoader());
        const user = await Auth.signIn(email, password);
        if (user) {
          localStorage.setItem(
            "TOKEN",
            user.signInUserSession?.accessToken.jwtToken
          );
          dispatch(
            actions.userLogin(
              { email: email, username: user?.username },
              navigate
            )
          );
        }
      } else {
        dispatch(loaderAction.closeLoader());
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
    } catch (error) {
      dispatch(loaderAction.closeLoader());
      Toast("error", error.message);
      const data = JSON.parse(JSON.stringify(error));
      if (data.code === "UserNotConfirmedException") {
        navigate("/auth/emailverify", { state: email });
        await Auth.resendSignUp(email);
        Toast("success", "code resent successfully");
      }
    }
  };
  return (
    <>
      <div className="authentication-form-title">
        <h2 className="title lato-medium-black-34px">Sign in</h2>
        <div className="new-user-sign-up">
          <span className="span0">New User ?</span>
          <br />
          <span className="lato-bold-chambray-13px">
            <Link to="/auth/register" className="fw-700 link">
              Sign up
            </Link>
          </span>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
        <div className="form-group">
          <NormalInputIcon
            label="Password"
            image={keySquare}
            type="password"
            name="password"
            placeholder="Password"
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
              let type = document.getElementById("password").type;
              document.getElementById("password").type =
                type === "password" ? "text" : "password";
            }}
          />
        </div>
        <div className="text-end link">
          <Link to="/auth/forgot" className="fw-700">
            Forgot your password?
          </Link>
        </div>
        <div className="authentication-submit">
          {/* <NormalButton label="Sign in" 
          type="submit" onClick={signIn} /> */}
          <NormalButton
            label={open ? <Circular /> : 'Sign in'}
            type="submit"
            onClick={signIn}
            //className={open && "p-0"}
          />
        </div>
        </form>
      
    </>
  );
};

export default CustomSignin;
