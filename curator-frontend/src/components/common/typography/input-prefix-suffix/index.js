export const NormalInputPrefixSuffix = (props) => {
  let {
    type = "text",
    className = "",
    placeholder = "Enter",
    label = "",
    errorMessage = "",
    options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ],
    onChange,
    name,
  } = props;

  return (
    <div className="mb-15 form-group">
      <label className="form-label" id="">
        {label}
      </label>
      <div className="form-box size-form">
        <div className="size-form-left">
          <input
            type={type}
            className="form-control page-form-control"
            id=""
            placeholder={placeholder}
            name={name}
            onChange={onChange}
          />
        </div>
        <div className="size-form-right">
          <select className="form-select page-form-select">
            {options?.map(({ value, label }, i) => (
              <option value={value} key={i}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {errorMessage && (
        <div className="form-text text-danger">{errorMessage}</div>
      )}
    </div>
  );
};
