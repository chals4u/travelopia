// import Select from 'react-select'
// import './select.scss'
export const Normalselect = (props) => {
  let {
    options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ],
    className = "",
    label = "",
    errorMessage = "",
    name = "",
  } = props;

  return (
    <div className="mb-15 form-group">
      <label className="form-label" id="">
        {label}
      </label>
      <div className="form-box">
        <select
          className={`form-select ${className}`}
          style={{ border: `${errorMessage && `1px solid red`}` }}
          onChange={props.onChange}
          name={name}
        >
          {options.length &&
            options?.map(({ label, value }, i) => (
              <option value={value} key={i}>
                {label}
              </option>
            ))}
        </select>
      </div>
      {errorMessage && (
        <div className="form-text text-danger">{errorMessage}</div>
      )}
    </div>
  );
};
