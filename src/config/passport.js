const passport = require('passport');
const passportJwt = require('passport-jwt');

const secret = 'Segredo!';

const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, async (payload, done) => {
    try {
      const user = await app.services.user.findOne({ id: payload.id });

      if (user) {
        done(null, { ...payload });
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  });

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};

/* const passport = require('passport');
const passportJwt = require('passport-jwt');

const secret = 'Segredo!';

const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, (payload, done) => {
    app.services.user
      .findOne({ id: payload.id })
      .then((user) => {
        if (user) {
          done(null, { ...payload });
        } else {
          done(null, false);
        }
      })
      .catch((err) => done(err, false));
  });

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};
 */
