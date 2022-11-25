export const NormalRadio = (props) => {
  let {
    className = "",
    id = Math.random(),
    label = "",
    errorMessage = "",
    checked = false,
    size = "",
    onChange,
  } = props;

  return (
    <div className={`form-group ${className}`}>
      <div className="relative checkbox-form">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id={id}
            // checked={checked}
            // onClick={onChange}
            onClick={onChange}
            {...props}
          />
          <label className="form-check-label" htmlFor={id}>
            {label}
          </label>
        </div>
      </div>
    </div>
  );
};
