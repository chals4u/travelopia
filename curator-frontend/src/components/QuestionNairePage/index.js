import { NormalButton } from "components/common/button";
import { PlainCard } from "components/common/plainCard";
import { NormalTextArea } from "components/common/textarea";
import { Count } from "./Count";

export const QuestionNairePage = () => {
  return (
    <>
      <div class="pb-30 content-panel questionnaire-panel">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="content">
                <div class="section-outer mt-30 questionnaire">
                  <form>
                    <Count value="1" />
                    <div class="mt-30 answers-list">
                      <div class="row">
                        <div class="col-12">
                          <div class="radius-8 mb-30 lato-bold-22px question">
                            What are symptoms about cardiac arrest?
                          </div>
                        </div>
                        <div class="col-12">
                          <PlainCard
                            title="definition"
                            className="overview-card answer"
                            text="Critical care medicine specializes in caring for
                              the most seriously ill patients. These patients
                              are best treated in an intensive care unit (ICU)
                              staffed by experienced personnel. Some hospitals
                              maintain separate units for special populations
                              (eg, cardiac, trauma, surgical, neurologic,
                              pediatric, or neonatal patients)."
                            textClass="line-height-24 mb-0 fw-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="answers-list none">
                      <div class="row">
                        <div class="col-12">
                          <NormalTextArea
                            label="Please add your inputs"
                            placeholder="Please add your inputs"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="authentication-submit action-btn">
                      <NormalButton label="Submit" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
