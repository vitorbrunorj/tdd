module.exports = (app) => {
  // Função para criar uma nova conta
  const create = async (req, res, next) => {
    try {
      const result = await app.services.account.save(req.body);
      res.status(201).json(result[0]);
    } catch (err) {
      next(err);
    }
  };

  // Função para buscar todas as contas
  const getAll = async (req, res, next) => {
    try {
      const result = await app.services.account.findAll();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  // Função para buscar uma conta pelo ID
  const get = async (req, res, next) => {
    try {
      const result = await app.services.account.find({ id: req.params.id });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  // Função para atualizar uma conta
  const update = async (req, res, next) => {
    try {
      const result = await app.services.account.update(req.params.id, req.body);
      res.status(200).json(result[0]);
    } catch (err) {
      next(err);
    }
  };

  // Função para remover uma conta
  const remove = async (req, res, next) => {
    try {
      await app.services.account.remove(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  return {
    create,
    getAll,
    get,
    update,
    remove,
  };
};

/* module.exports = (app) => {
  // Função para criar uma nova conta
  const create = async (req, res, next) => {
    try {
      const result = await app.services.account.save(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return next(err);
    }
  };

  // Função para buscar todas as contas
  const getAll = async (req, res, next) => {
    try {
      const result = await app.services.account.findAll();
      res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  // Função para buscar uma conta pelo ID
  const get = async (req, res, next) => {
    try {
      const result = await app.services.account.find({ id: req.params.id });
      res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  // Função para atualizar uma conta
  const update = async (req, res, next) => {
    try {
      const result = await app.services.account.update(req.params.id, req.body);
      res.status(200).json(result[0]);
    } catch (err) {
      return next(err);
    }
  };

  // Função para remover uma conta
  const remove = (req, res, next) => {
    try {
      app.services.account
        .remove(req.params.id)
        .then(() => res.status(204).send());
    } catch (err) {
      return next(err);
    }
  };

  return {
    create,
    getAll,
    get,
    update,
    remove,
  };
}; */
