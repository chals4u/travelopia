import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";
//component
import Signup from "components/CustomSignup/index";
import SocialLogin from "components/SocialLogin/index";

//images
import logoWhite from "assets/images/logo-white.svg";

import AuthContent from "pages/AuthContent";

export const SignupPage = () => {
  const [federated, setFederated] = useState(false);
  const {user} = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      if (user?.detail?.first_name) {
        setFederated(true);
      }
    } else {
      setFederated(false);
    }
  }, []);

  return (
    <>
      <div className="authentication-outer">
        <div className="relative authentication-bg">
          <div className="container-md">
            <div className="authentication">
              <div className="row">
                <div className="col-6 col-md-3">
                  <div className="authentication-logo">
                    <img
                      src={`${logoWhite}`}
                      alt="Pheno-wise"
                      title="Pheno-wise"
                    />
                  </div>
                </div>
              </div>
              <AuthContent />
              <div className="authentication-form form-forgot-password form-register">
                <div className="row">
                  <div className="col-12">
                    <div className="authentication-form-box">
                      <Signup />
                      {!federated && <SocialLogin />}
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
