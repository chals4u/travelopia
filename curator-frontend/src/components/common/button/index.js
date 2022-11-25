/* eslint-disable no-unused-vars */

export const NormalButton = (props) => {
  let {
    label = "",
    className = "btn btn-primary",
    isLoader = false,
    disabled,
    variant = "contained",
    materialUi = true,
    onClick,
    type = "submit",
  } = props;

  return (
    <button {...props} className={className}>
      {label}
    </button>
  );
};
