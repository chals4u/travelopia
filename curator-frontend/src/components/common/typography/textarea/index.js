export const NormalTextArea = (props) => {
  let {
    className = "",
    placeholder = "",
    label = "",
    errorMessage = "",
    rows = 3,
    onChange,
    name = "",
    btnName,
    id,
    btnId,
    value,
  } = props;

  return (
    <div className={`mb-15 form-group ${className}`}>
      <label className="form-label d-flex justify-content-between" id="">
        <span class="text"> {label}</span>
        {btnName && (
          <button
            type="button"
            class="btn btn-primary icon-btn"
            data-bs-toggle="modal"
            data-bs-target={"#special-condition" + btnId}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <g clip-path="url(#clip0_1153_126)">
                <path
                  d="M13.8962 12.18L10.1902 8.4735C10.7327 7.61892 11.046 6.60683 11.046 5.52242C11.0466 2.478 8.56858 0 5.523 0C2.47742 0 0 2.478 0 5.523C0 8.56858 2.47742 11.0466 5.523 11.0466C6.55433 11.0466 7.51858 10.7625 8.34575 10.269L12.0767 14L13.8962 12.18ZM2.058 5.523C2.058 3.61375 3.61258 2.05917 5.52242 2.05917C7.43283 2.05917 8.98742 3.61317 8.98742 5.523C8.98742 7.43342 7.43283 8.98742 5.52242 8.98742C3.61258 8.98742 2.058 7.43342 2.058 5.523Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1153_126">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {btnName}
          </button>
        )}
      </label>

      <div className="form-box">
        <textarea
          className="form-control page-form-control"
          rows={rows}
          onChange={onChange}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
        ></textarea>
      </div>
      {errorMessage && (
        <div className="form-text text-danger">{errorMessage}</div>
      )}
    </div>
  );
};
