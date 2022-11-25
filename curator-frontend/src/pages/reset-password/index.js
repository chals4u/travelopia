import React from "react";

//component
import { ResetPassword } from "components/ResetPassword";

//images
import logoWhite from "assets/images/logo-white.svg";
import AuthContent from "pages/AuthContent";

export const ResetPasswordPage = () => {
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
              <div className="authentication-form form-forgot-password form-reset-password">
                <div className="row">
                  <div className="col-12">
                    <div className="authentication-form-box">
                      <ResetPassword />
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
