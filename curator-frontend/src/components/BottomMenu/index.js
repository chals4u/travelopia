/* eslint-disable jsx-a11y/anchor-is-valid */

import { useNavigate } from "react-router-dom";

export const BottomMenu = () => {
  const navigate = useNavigate();
  return (
    <>
      <div class="bottom-menu-wrapper">
        <div class="relative bottom-menus">
          <div class="center-menu">
            <a href="" onClick={() => navigate("/decks")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
              >
                <path
                  d="M21.2931 31.3542C21.2931 33.3667 19.6656 35 17.6488 35C15.6392 35 14.0044 33.3667 14.0044 31.3542C14.0044 29.3417 15.6392 27.7083 17.6488 27.7083C19.6656 27.7083 21.2931 29.3402 21.2931 31.3542ZM17.764 0C11.8883 0 7.46812 3.92729 7.46812 11.6667H13.2358C13.2358 8.30667 14.5571 5.55771 17.6458 5.55771C19.4644 5.55771 21.3938 6.76521 21.56 9.07375C21.7394 11.5033 20.4415 12.7356 18.8008 14.2975C14.5367 18.3517 14.6942 20.2023 14.6942 24.7917H20.4444C20.4444 22.6742 20.2154 21.1342 23.1248 17.9973C25.0658 15.9031 27.4794 13.2985 27.5304 9.33042C27.599 3.55104 23.5185 0 17.764 0V0Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
          <ul>
            <li>
              <a href="" class="lato-semi-bold-fedora-13px">
                <span class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="31"
                    height="29"
                    viewBox="0 0 31 29"
                    fill="none"
                  >
                    <path
                      d="M15.5 6.81625L26.75 17.285V28.75H19.25V21.25H11.75V28.75H4.25V17.285L15.5 6.81625ZM30.5 13.935L15.5 0L0.5 13.9163L2.20125 15.7475L15.5 3.4125L28.7987 15.7663L30.5 13.935Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span class="text">Home</span>
              </a>
            </li>
            <li>
              <a href="" class="lato-semi-bold-fedora-13px">
                <span class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M26.029 22.6208C21.7301 21.6282 17.7287 20.7582 19.6663 17.0981C25.5665 5.9577 21.2301 0 15.0011 0C8.6484 0 4.42076 6.18646 10.336 17.0981C12.3323 20.7794 8.17963 21.6495 3.97324 22.6208C0.131862 23.5083 -0.0118929 25.4159 0.000607543 28.751L0.00560771 30.001H29.9941L29.9991 28.7897C30.0141 25.4296 29.8841 23.512 26.029 22.6208Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span class="text">Profile</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
