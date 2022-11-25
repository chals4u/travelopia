/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import { useNavigate } from "react-router-dom";

//images
import logoWhite from "assets/images/logo-white.svg";

export const EmailVerification = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="authentication-outer">
        <div className="relative authentication-bg">
          <div className="container-md">
            <div className="authentication email-authentication">
              <div className="row justify-content-center">
                <div className="col-6 col-md-3">
                  <div className="authentication-logo email-verification-logo">
                    <img
                      src={`${logoWhite}`}
                      alt="Phenowise"
                      title="Phenowise"
                    />
                  </div>
                </div>
              </div>
              <div className="authentication-form email-verification">
                <div className="row">
                  <div className="col-12">
                    <div className="authentication-form-box">
                      <div className="text-center authentication-form-title">
                        <h2 className="title lato-medium-black-34px">
                          Welcome to Phenowise
                        </h2>
                      </div>
                      <div className="email-verification-content">
                        <p className="fw-600 text-center">
                          Thank you for verifying your email.
                        </p>
                        <p className="fw-600 text-center">
                          Start capturing your family's health by logging in.
                        </p>
                      </div>
                      <div className="authentication-submit">
                        <a
                          href=""
                          className="btn btn-primary"
                          onClick={() => navigate("/auth/login")}
                        >
                          Go to login
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
