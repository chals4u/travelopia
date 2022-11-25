export const NormalInput = (props) => {
  let {
    type = "text",
    className = "",
    placeholder = "Enter",
    label = "",
    errorMessage = "",
    name = "",
    inputClass = "page-form-control",
  } = props;

  return (
    <div className={`mb-15 form-group ${className}`}>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <div className="form-box">
        <input
          type={type}
          className={`form-control ${inputClass}`}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={props.onChange}
          value={props.value}
          style={{ border: `${errorMessage && `1px solid red`}` }}
          {...props}
        />
      </div>
      {errorMessage && (
        <div className="form-text text-danger">{errorMessage}</div>
      )}
    </div>
  );
};
