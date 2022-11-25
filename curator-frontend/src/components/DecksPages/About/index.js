import { PlainCard } from "components/common/plainCard";

import User from "assets/images/user.jpg";
import { NormalButton } from "components/common/button";

export const About = () => {
  return (
    <>
      <div
        class="tab-pane fade show active"
        id="About"
        role="tabpanel"
        aria-labelledby="Decks-tab"
        tabindex="0"
      >
        <div class="mb-20 about">
          <PlainCard
            title="Patient Care"
            text="Critical care medicine specializes in caring for the most
              seriously ill patients. These patients are best treated in an
              intensive care unit (ICU) staffed by experienced personnel. Some
              hospitals maintain separate units for special populations (eg,
              cardiac, trauma, surgical, neurologic, pediatric, or neonatal
              patients)."
            textClass="line-height-24 mb-0 fw-500"
            className="overview-card"
            classText="author"
          />
          <PlainCard
            title="Author"
            text="Murphy"
            textClass="line-height-24 mb-0 fw-500"
            className="author-card"
            email="murphy@mail.com"
            image={User}
          />

          <div class="authentication-submit action-btn">
            <NormalButton label="Submit" />
          </div>
        </div>
      </div>
    </>
  );
};
