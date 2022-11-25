/* eslint-disable jsx-a11y/anchor-is-valid */
export const NormalInputIcon = (props) => {
  let {
    type = "text",
    className = "",
    placeholder = "Enter",
    label = "",
    errorMessage = "",
    name = "",
    removeClick = "",
    image,
    value,
    onChange,
    rightIcon,
    rightIconClick,
  } = props;

  return (
    <div className={`form-group ${className}`}>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      {removeClick && (
        <a className="ms-3 text-secondary small p-0" onClick={removeClick}>
          Remove
        </a>
      )}
      <div className="relative form-box">
        <div className="form-icon-left">
          <img src={image} alt="img" title="img" />
        </div>
        <input
          type={type}
          className="form-control icon-form-control"
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          style={{ border: `${errorMessage && `1px solid red`}` }}
          {...props}
        />
        {rightIcon && (
          <div className="form-icon-right">
            <a href="" onClick={rightIconClick}>
              <img src={`${rightIcon}`} alt="view" title="view" />
            </a>
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="form-text text-danger">{errorMessage}</div>
      )}
    </div>
  );
};
