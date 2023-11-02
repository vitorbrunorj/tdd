const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

const secret = 'Segredo!';

module.exports = (app) => {
  const signin = async (req, res, next) => {
    try {
      const user = await app.services.user.findOne({ mail: req.body.mail });

      if (bcrypt.compareSync(req.body.passwd, user.passwd)) {
        const payload = {
          id: user.id,
          name: user.name,
          mail: user.mail,
        };
        const token = jwt.encode(payload, secret);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
      }
    } catch (err) {
      next(err);
    }
  };

  return { signin };
};



/* const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

const secret = 'Segredo!';

module.exports = (app) => {
  const signin = (req, res, next) => {
    app.services.user
      .findOne({ mail: req.body.mail })
      .then((user) => {
        if (bcrypt.compareSync(req.body.passwd, user.passwd)) {
          const payload = {
            id: user.id,
            name: user.name,
            mail: user.mail,
          };
          const token = jwt.encode(payload, secret);
          res.status(200).json({ token });
        }
      })
      .catch((err) => next(err));
  };

  return { signin };
};
 */
