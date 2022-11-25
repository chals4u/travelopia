export const NormalCard = (props) => {
  let { color = "blue", count, title } = props;
  return (
    <>
      <div class={`radius-8 count-card ${color}`}>
        <h3 class="lato-semi-bold-white-34px fw-700 card-count">{count}</h3>
        <h5 class="lato-semi-bold-white-14px title">{title}</h5>
      </div>
    </>
  );
};
