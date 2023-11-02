module.exports = (app) => {
  // Função para criar uma nova conta
  const create = async (req, res) => {
    try {
      const result = await app.services.account.save(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // Função para buscar todas as contas
  const getAll = async (req, res) => {
    const result = await app.services.account.findAll();
    res.status(200).json(result);
  };

  // Função para buscar uma conta pelo ID
  const get = async (req, res) => {
    const result = await app.services.account.find({ id: req.params.id });
    res.status(200).json(result);
  };

  // Função para atualizar uma conta
  const update = async (req, res) => {
    const result = await app.services.account.update(req.params.id, req.body);
    res.status(200).json(result[0]);
  };

  // Função para remover uma conta
  const remove = (req, res) => {
    app.services.account
      .remove(req.params.id)
      .then(() => res.status(204).send());
  };

  return {
    create,
    getAll,
    get,
    update,
    remove,
  };
};
