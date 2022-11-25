/* eslint-disable jsx-a11y/anchor-is-valid */
import { NormalTabs } from "components/common/tab";
import { About } from "components/DecksPages/About";
import { Deck } from "components/DecksPages/Deck";
import { LeaderBoard } from "components/DecksPages/LeaderBoard";
import { Navbar } from "components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Decks = () => {
  const tab = ["Decks", "About", "Leaderboard"];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChangeTab = (val) => {
    setActiveIndex(val);
  };
  const navigate = useNavigate();
  return (
    <>
      <div class="main-container">
        <div class="user-admin">
          <Navbar />
          <div class="pb-30 content-panel">
            <div class="container-fluid">
              <div class="row mb-20 full-header">
                <div class="col-12">
                  <div class="content pb-0">
                    <div class="pt-20 pb-45 d-flex align-items-center page-title">
                      <a href="" class="back" onClick={() => navigate("/")}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_955_249)">
                            <path
                              d="M16.67 0.5L19.5 3.329L10.161 12.504L19.5 21.671L16.67 24.5L4.5 12.504L16.67 0.5Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_955_249">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="translate(0 0.5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <h1
                        class="lato-semi-bold-white-34 px m-0 pl-10 fw-700"
                        onClick={() => navigate("/")}
                      >
                        Intensive Care
                      </h1>
                    </div>
                    <NormalTabs
                      data={tab}
                      onChange={(i) => handleChangeTab(i)}
                      index={activeIndex}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="content">
                    <div class="tab-page">
                      <div class="tab-content" id="curator-tab-content">
                        {activeIndex === 0 && <Deck />}
                        {activeIndex === 1 && <About />}
                        {activeIndex === 2 && <LeaderBoard />}
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
