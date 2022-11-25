export const NormalTextArea = (props) => {
  let { label, placeholder = "" } = props;
  return (
    <>
      <div class="mb-15 form-group">
        <label class="form-label" id="">
          {label}
        </label>
        <div class="form-box">
          <textarea
            class="form-control page-form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder={placeholder}
          ></textarea>
        </div>
      </div>
    </>
  );
};
