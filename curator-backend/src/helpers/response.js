module.exports.create = (status, data) => {
    return {
      statusCode: status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  };
  