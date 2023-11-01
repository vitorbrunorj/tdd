module.exports = (app) => {
  const findAll = async (req, res) => {
    const result = await app.services.user.findAll();
    res.status(200).json(result);
  };

  const create = async (req, res) => {
    const result = await app.services.user.save(req.body);
    if (result.error) {
      res.status(400).json(result);
    } else {
      res.status(201).json(result[0]);
    }
  };

  return { findAll, create };
};
