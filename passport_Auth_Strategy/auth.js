const LocalStrategy = require("passport-local").Strategy;
const Muguser = require("../models/Muguser");
const bcrypt = require("bcrypt");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      (username, password, done) => {
        console.log(username);

        Muguser.findOne({ username: username })
          .then((user) => {   
            if (!user) {
              return done(null, false, { msg: "username doesnot exists" });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { msg: "Password didn't match" });
              }
            });
          })
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    Muguser.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
