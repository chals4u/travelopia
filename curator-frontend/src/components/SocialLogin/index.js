/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

//images
import google from "assets/images/Google.svg";
// import apple from "assets/images/Apple.svg";
import facebook from "assets/images/facebook.svg";

import { Amplify, Auth } from "aws-amplify";
import awsconfig from "aws-exports";
import { Navigate, useNavigate } from "react-router-dom";

//redux
import { connect, useDispatch, useSelector } from "react-redux";

//actions
import { actions } from "redux/User/action";

Amplify.configure(awsconfig);

// You can get the current config object
Auth.configure();

const SocialLogin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional,By default is false.If set to true,this call will senda
      //  request to Cognito to get the latest user data
    })
      .then((user) => {
        if (user) {
          localStorage.setItem(
            "TOKEN",
            user.signInUserSession?.accessToken.jwtToken
          );

          dispatch(
            actions.userLogin(
              {
                email: user?.attributes?.email,
                username: user?.username,
              },
              navigate
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   if (user_) {
  //     navigate("/dashboard");
  //   }
  // }, [user_]);

  return (
    <>
      <div className="social-media-login">
        <h4 className="title lato-medium-22px">Sign up with</h4>
        <ul>
          <li>
            <a
              onClick={() => {
                Auth.federatedSignIn({ provider: "Google" });
              }}
            >
              <img src={`${google}`} alt="Google" title="Google" />
            </a>
          </li>
          {/* <li>
            <a>
              <img src={`${apple}`} alt="Apple" title="Apple" />
            </a>
          </li> */}
          <li>
            <a
              onClick={() => {
                Auth.federatedSignIn({ provider: "Facebook" });
              }}
            >
              <img src={`${facebook}`} alt="Facebook" title="Facebook" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SocialLogin;
