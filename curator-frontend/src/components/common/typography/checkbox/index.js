export const NormalCheckbox = (props) => {
  let {
    className = "",
    id = Math.random(),
    label = "",
    checked,
    onChange,
  } = props;

  return (
    <div className={` form-group ${className}`}>
      <div className="relative checkbox-form">
        <div className="form-check form-check-inline">
          <input
            {...props}
            className="form-check-input"
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor={id}>
            {label}
          </label>
        </div>
      </div>
    </div>
  );
};
