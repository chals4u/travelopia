/**
 * @desc    Send any success response
 *
 * @param   {object | array} results
 * @param   {number} statusCode
 */

exports.success = (message, result, statusCode) => {
  return {
    error: false,
    message,
    result,
    statusCode,
  };
};

/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */
exports.error = (message, statusCode) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 409, 422, 500];

  // Get matched code
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message,
    code: statusCode,
    error: true,
    isBase64Encoded: false,
  };
};

/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
exports.validation = (errors) => {
  return {
    message: "Validation errors",
    error: true,
    code: 422,
    isBase64Encoded: false,
    errors,
  };
};
