import React from "react";
//images
import logoWhite from "assets/images/logo-white.svg";

//component
import { Verification } from "components/Verification";
import AuthContent from "pages/AuthContent";

export const VerificationPage = () => {
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
              <div className="authentication-form form-forgot-password">
                <div className="row">
                  <div className="col-12">
                    <div className="authentication-form-box">
                      <Verification />
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
