import authenticationImage from "assets/images/authentication-image.png";

const AuthContent = () => {
  return (
    <div className="authentication-content">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-7">
          <div className="authentication-text">
            <h1 className="title lato-semi-bold-white-34px">
              Patient Wellness Programs
            </h1>
            <h4 className="lato-bold-white-18px">
              How Patient Wellness Programs can Improve Health Outcomes?
            </h4>
            <p className="lato-semi-bold-white-14px">
              A wellness program includes activities that help patients to
              attain well-being. This may include weight loss programs,
              exercises, stress management techniques, wellness assessments,
              smoking cessation programs, diet plans, ways to track health
              vitals, etc.
            </p>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-5">
          <div className="authentication-image">
            <img
              src={`${authenticationImage}`}
              alt="Phenowise"
              title="Phenowise"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContent;
