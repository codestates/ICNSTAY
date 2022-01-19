module.exports = {
  get: (req, res) => {
    res.status(200).json('userInfo get');
  },
  post: (req, res) => {
    res.status(200).json('userInfo post');
  },
  delete: (req, res) => {
    res.status(200).json('userInfo delete');
  }
}