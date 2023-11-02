const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  // Rota para criar uma nova conta
  router.post('/', async (req, res, next) => {
    try {
      const result = await app.services.account.save({
        ...req.body,
        user_id: req.user.id,
      });
      res.status(201).json(result[0]);
    } catch (err) {
      next(err);
    }
  });

  // Rota para buscar todas as contas
  router.get('/', async (req, res, next) => {
    try {
      const result = await app.services.account.findAll(req.user.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  // Rota para buscar uma conta pelo ID
  router.get('/:id', async (req, res, next) => {
    try {
      const result = await app.services.account.find({ id: req.params.id });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  // Rota para atualizar uma conta pelo ID
  router.put('/:id', async (req, res, next) => {
    try {
      const result = await app.services.account.update(req.params.id, req.body);
      res.status(200).json(result[0]);
    } catch (err) {
      next(err);
    }
  });

  // Rota para remover uma conta pelo ID
  router.delete('/:id', async (req, res, next) => {
    try {
      await app.services.account.remove(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

  return router;
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
