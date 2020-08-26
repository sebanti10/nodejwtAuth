const verify = (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.sendStatus(200);
};

const accessKey = (req, res) => res.send(process.env.ACCESS_TOKEN_SECRET);

module.exports = {
  verify,
  accessKey,
};
