/* eslint-disable jsx-a11y/anchor-is-valid */
export const PlainCard = (props) => {
  let {
    subTitle = "",
    mainTitle = "",
    image,
    text = "",
    className = "",
    title,
    textClass = "",
    email = "",
    point = "",
  } = props;
  return (
    <>
      <div class={`radius-8 mb-20 section-outer-plain ${className}`}>
        <h2 class="m-0 pb-10 lato-bold-22px title">{title}</h2>
        <h5 class="lato-semi-bold-fedora-14px sub-title">{subTitle}</h5>
        <h4 class="lato-bold-white-18px main-title">{mainTitle}</h4>
        <div class={`${email ? "author" : "d-flex align-items-center user"}`}>
          {image && (
            <div class={`${email ? "image" : "mr-10 user-image"} `}>
              <img src={`${image}`} alt="user" title="user" />
            </div>
          )}
          <div class="text-box">
            <div class={`lato-normal-mirage-13px user-text ${textClass}`}>
              {text}
            </div>
            <div class="lato-semi-bold-fedora-14px fw-500 email">{email}</div>
            <div class="text-end lato-bold-white-18px fw-600 points">
              {point}
            </div>
          </div>
          {email && !point && (
            <div class="email-icon">
              <a
                href=""
                class="d-flex align-items-center justify-content-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                >
                  <g clip-path="url(#clip0_962_807)">
                    <path
                      d="M0.5 2.25V15.75H18.5V2.25H0.5ZM16.6385 3.75L9.5 9.53475L2.3615 3.75H16.6385ZM2 14.25V5.38725L9.5 11.4653L17 5.38725V14.25H2Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_962_807">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          )}
        </div>
        
      </div>
    </>
  );
};
