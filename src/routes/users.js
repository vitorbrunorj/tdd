module.exports = (app) => {
  const findAll = async (req, res) => {
    const result = await app.services.user.findAll();
    res.status(200).json(result);
  };

  const create = async (req, res) => {
    try {
      const result = await app.services.user.save(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  return { findAll, create };
};

