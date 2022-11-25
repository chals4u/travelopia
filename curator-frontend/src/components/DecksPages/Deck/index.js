import { ProgressCard } from "components/common/progressCard";

export const Deck = () => {
  return (
    <>
      <div
        class="tab-pane fade show active"
        id="Decks"
        role="tabpanel"
        aria-labelledby="Decks-tab"
        tabindex="0"
      >
        <div class="decks-progress-listing">
          <ProgressCard title="Patient Care" total="82" progress="4" />
          <ProgressCard title="Critical Conditions" total="60" progress="0" />
          <ProgressCard title="Related Complications" total="76" progress="0" />
          <ProgressCard title="Remove it" total="68" progress="0" />
        </div>
      </div>
    </>
  );
};
