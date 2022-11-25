/* eslint-disable jsx-a11y/anchor-is-valid */
import Logo from "assets/images/logo.svg";
import Bell from "assets/images/bell.svg";
import User from "assets/images/user.jpg";
import { useNavigate } from "react-router-dom";

import { Auth } from "aws-amplify";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "redux/User/action";
import { NormalButton } from "components/common";

export const Navbar1 = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      localStorage.clear();
      dispatch(actions.userLogout(navigate));
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <>
      <header className="pl-15 pr-15 header">
        <div className="header-left">
          <div className="logo">
            <img src={`${Logo}`} alt="Phenowise" title="Curator" />
          </div>
        </div>
        <div className="header-right">
        {/* <div className="relative ml-20 mr-20  header-notification">
            <div className="header-notification-count">9+</div>
            <img src={Bell} alt="notification" title="notification" />
          </div> */}
          {/*<div className="header-user">
            <div className="dropdown">
              <button
                className="p-0 dropdown-toggle header-user-thumb"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="header-user-thumb-image">
                  <img src={`${User}`} alt="user" title="user" />
                </div>
                <div className="fw-600 pl-10 header-user-thumb-text">
                {user && (user.detail ? user.detail.first_name : "")}
                </div>
              </button>
              <ul className="dropdown-menu">
                 <li>
                  <a className="dropdown-item" href="">
                    Total points: 5
                  </a>
                </li> 
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item"  onClick={signOut}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>*/}
        </div>
      </header>
    </>
  );
};
