export const Count = (props) => {
  let { value } = props;
  return (
    <>
      <div class="d-flex justify-content-center questionnaire-count">
        <div class="d-flex justify-content-center align-items-center count">
          {value}
        </div>
      </div>
    </>
  );
};
