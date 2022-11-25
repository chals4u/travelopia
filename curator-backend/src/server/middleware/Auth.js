const jwt_decode = require("jwt-decode");
const helper = require("../user/helper")

exports.auth = async (token) => {
  try {
    var decoded = await jwt_decode(token);

    // const user = await UserModel.findOne({"detail.username": decoded.username});

    const user = await helper.getUserByUsername(decoded.username);

    if (user.Count > 0) {
      return {
        status: true,
        decoded: user.Items[0],
      };
    } else {
      return {
        status: false,
        error: "UnAuthorized Access!",
        code: 401,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      error: error.message,
    };
  }
};
