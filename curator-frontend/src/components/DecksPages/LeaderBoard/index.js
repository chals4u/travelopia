import { NormalButton } from "components/common/button";
import User from "assets/images/user.jpg";
import { PlainCard } from "components/common/plainCard";

export const LeaderBoard = () => {
  return (
    <>
      <div
        class="tab-pane fade show active"
        id="Leaderboard"
        role="tabpanel"
        aria-labelledby="Decks-tab"
        tabindex="0"
      >
        <div
          class="radius-8 mb-20 section-outer-plain author-card Leaderboard-listing"
          id="Leaderboard"
        >
          <h2 class="m-0 pb-15 lato-bold-22px title">Author</h2>
          <div class="author mb-20 leaderboard-card">
            <div class="image">
              <img src={User} alt="user" title="user" />
            </div>
            <div class="text-box">
              <div class="lato-semi-bold-fedora-14px fw-600 pb-10 name">
                Milly
              </div>
              <div class="lato-semi-bold-fedora-14px fw-500 email">
                Last 7 Days
              </div>
            </div>
            <div class="text-end lato-bold-white-18px fw-600 points">
              35,351 pts
            </div>
          </div>
          <div class="author mb-20 leaderboard-card">
            <div class="image">
              <img src={User} alt="user" title="user" />
            </div>
            <div class="text-box">
              <div class="lato-semi-bold-fedora-14px fw-600 pb-10 name">
                Joshua Lawrence
              </div>
              <div class="lato-semi-bold-fedora-14px fw-500 email">
                Last 7 Days
              </div>
            </div>
            <div class="text-end lato-bold-white-18px fw-600 points">
              45, 000 pts
            </div>
          </div>
          <div class="author mb-20 leaderboard-card">
            <div class="image">
              <img src={User} alt="user" title="user" />
            </div>
            <div class="text-box">
              <div class="lato-semi-bold-fedora-14px fw-600 pb-10 name">
                Karen Castillo
              </div>
              <div class="lato-semi-bold-fedora-14px fw-500 email">
                Last 7 Days
              </div>
            </div>
            <div class="text-end lato-bold-white-18px fw-600 points">
              20.,774 pts
            </div>
          </div>
        </div>
        <div class="authentication-submit action-btn">
          <NormalButton label="Share Leaderboard" />
        </div>
      </div>
    </>
  );
};
