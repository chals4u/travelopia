/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";

import { useNavigate, Link } from "react-router-dom";

import SimpleReactValidator from "simple-react-validator";

//redux
import { connect, useDispatch, useSelector } from "react-redux";

//images
import name from "assets/images/name.svg";
import phone from "assets/images/phone.svg";
import sms from "assets/images/sms.svg";
import keySquare from "assets/images/key-square.svg";
import eye from "assets/images/eye.svg";

import { Auth } from "aws-amplify";
import { ToastContainer } from "react-toastify";
import { Toast } from "utils/Toast";

//actions
import { actions } from "redux/User/action";
import loaderAction from 'redux/Loader/action';

//component
import { NormalInputIcon } from "components/common/typography/input-icon";
import {
  NormalButton,
  NormalCheckbox,
  NormalRadio,
  Normalselect,
} from "components/common";
import { Circular } from 'components/Loader/circular';


const Signup = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [federated, setFederated] = useState(false);
  const [agreeToShare, setAgreeToShare] = useState(false);
  const [isAuthorize, setIsAuthorized] = useState(false);
  const [, forceUpdate] = useState();
  const { user } = useSelector((state) => state.user);

  const simpleValidator = useRef(
    new SimpleReactValidator({
      className: "error-message",
    })
  );
  const { networkProgressDialog: open } = useSelector((state) => state.loader);

  useEffect(() => {
    if (user) {
      if (!user.detail?.first_name) {
        setFederated(true);
        setEmail(user.detail?.email);
      }
    } else {
      setFederated(false);
    } //eslint-disable-next-line
  }, []);
  const signUp = async () => {
    try {
      if (!federated) {
        dispatch(loaderAction.startLoader());
        const formValid = simpleValidator.current.allValid();
        if (formValid) {
          //eslint-disable-next-line
          const { user } = await Auth.signUp({
            username: email,
            password: password,
            attributes: {
              "custom:first_name": firstName,
              "custom:last_name": lastName,
              "custom:middle_name": middleName,
              "custom:authorized_by": authorizedBy,
              "custom:telephone": telephone,
            },
          });

          const userData = {
            first_name: firstName,
            last_name: lastName,
            middle_name: middleName,
            authorized_by: authorizedBy,
            telephone: telephone,
            email: email,
            agreeToShare: agreeToShare,
            isAuthorizeToAddUsers: isAuthorize,
          };

          dispatch(actions.userRegistration(userData, navigate));
        } else {
          simpleValidator.current.showMessages();
          forceUpdate(1);
        }
      } else {
        dispatch(loaderAction.startLoader());
        const email_ = simpleValidator.current.fieldValid("Email");
        const name = simpleValidator.current.fieldValid("First name");
        const mname = simpleValidator.current.fieldValid("Middle name");
        const lname = simpleValidator.current.fieldValid("Last name");
        const telephone_ = simpleValidator.current.fieldValid("telephone");
        const authorized = simpleValidator.current.fieldValid("Authorized by");
        if (name && email_ && mname && lname && telephone_ && authorized) {
          const userData = {
            first_name: firstName,
            last_name: lastName,
            middle_name: middleName,
            authorized_by: authorizedBy,
            telephone: telephone,
            email: email,
            agreeToShare: agreeToShare,
            isAuthorizeToAddUsers: isAuthorize,
            username: user.detail?.username,
          };
          dispatch(actions.userRegistration(userData, navigate));
        } else {
          simpleValidator.current.showMessages();
          forceUpdate(1);
        }
      }
    } catch (error) {
      Toast("error", error.message);
      console.log("error signing up:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="authentication-form-title">
        <h2 className="title lato-medium-black-34px">Sign up</h2>
        <div className="new-user-sign-up">
          <span className="span0">Existing user</span>
          <br />
          <span className="lato-bold-chambray-13px">
            <Link to="/auth/login" className="fw-700 link">
              Login
            </Link>
          </span>
        </div>
      </div>
      <div className="form">
        <div className="row">
          <div className="col-md-4">
            <NormalInputIcon
              label="First name"
              image={name}
              type="text"
              name="First-name"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              errorMessage={simpleValidator.current.message(
                "First name",
                firstName,
                "required"
              )}
            />
          </div>
          <div className="col-md-4">
            <NormalInputIcon
              label="Middle name"
              image={name}
              type="text"
              name="Middle-name"
              placeholder="Middle name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              errorMessage={simpleValidator.current.message(
                "Middle name",
                middleName,
                "required"
              )}
            />
          </div>
          <div className="col-md-4">
            <NormalInputIcon
              label="Last name"
              image={name}
              type="text"
              name="Last-name"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              errorMessage={simpleValidator.current.message(
                "Last name",
                lastName,
                "required"
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
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
                removeClick={
                  federated
                    ? () => {
                        localStorage.removeItem("TOKEN");
                        setFederated(false);
                      }
                    : ""
                }
              />
            </div>
          </div>
          <div className="col-md-4">
            <NormalInputIcon
              label="Telephone"
              image={phone}
              type="text"
              name="Telephone"
              placeholder="Telephone"
              maxLength={11}
              value={telephone}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setTelephone(e.target.value);
                }
              }}
              errorMessage={simpleValidator.current.message(
                "telephone",
                telephone,
                "required|phone"
              )}
            />
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <Normalselect
                label="Authorized by"
                errorMessage={simpleValidator.current.message(
                  "Authorized by",
                  authorizedBy,
                  "required"
                )}
                onChange={(e) => setAuthorizedBy(e.target.value)}
                options={[
                  { value: "1", label: "Select" },
                  { value: "2", label: "Patient" },
                  { value: "3", label: "Self" },
                ]}
              />
            </div>
          </div>
        </div>
        {!federated && (
          <div className="row">
            <div className="col-md-4">
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
                    !federated ? "required" : ""
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
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <NormalInputIcon
                  label="Confirm Password"
                  image={keySquare}
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  errorMessage={simpleValidator.current.message(
                    "Confirm Password",
                    confirmPassword,
                    !federated ? `required|in:${password}` : "",
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
          </div>
        )}
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="form-label" htmlFor="">
                Completed Use term and privacy agreement
              </label>
              <NormalCheckbox
                id="Agreestoshare"
                defaultChecked
                onChange={(e) => {
                  setAgreeToShare(e.target.checked);
                }}
                label="Agrees to share"
                className="mt-3 mb-15"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="form-label" htmlFor="">
                This user is authorized to add users for patient
              </label>
              <div className="relative form-box">
                <div className="form-check form-check-inline d-flex">
                  <NormalRadio
                    label="Yes"
                    value="Agreestoshare"
                    name="agree"
                    onChange={() => setIsAuthorized(true)}
                    id="yes"
                  />
                  <NormalRadio
                    label="No"
                    defaultChecked
                    value="Doesnotagree"
                    name="agree"
                    onChange={() => setIsAuthorized(false)}
                    id="no"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="authentication-submit">
        <NormalButton
            label={open ? <Circular /> : 'Register'}
            type="submit"
            onClick={signUp}
            className={open && "p-0"}
          />
        </div>
      </div>
    </>
  );
};

export default connect(null, {})(Signup);
