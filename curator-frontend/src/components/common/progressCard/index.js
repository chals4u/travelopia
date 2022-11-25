import { useNavigate } from "react-router-dom";

export const ProgressCard = (props) => {
  const navigate = useNavigate();

  let { title, total, progress } = props;
  return (
    <>
      <div
        class="radius-8 mb-20 section-outer-plain d-flex align-items-center decks-progress-card"
        onClick={() => navigate("/questionnaire")}
      >
        <div class="decks-progress-left">
          <h5 class="m-0 pb-10 lato-semi-bold-fedora-14px title">{title}</h5>
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-label="Example 20px high"
              style={{ width: "25%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
        <div class="text-end lato-bold-white-18px fw-600 decks-progress-right">
          {progress}/{total}
        </div>
      </div>
    </>
  );
};
