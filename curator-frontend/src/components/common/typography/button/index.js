export const NormalButton = (props) => {
  let { label = "", className = "" } = props;

  return (
    <button {...props} className={`btn btn-primary ${className}`}>
      {label}
    </button>
  );
};
