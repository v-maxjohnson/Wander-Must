// requiring bcrypyt, which is used to hash passwords
var bCrypt = require('bcrypt');

// instantiating the passport functionality and passing the function 
// a user to process
module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth20').OAuth2Strategy;
    var Strategy = require('passport-twitter').Strategy;

    // passport needs to save a user ID which it uses 
    // to retrieve user details when needed
    passport.serializeUser(function (user, done) {
        // console.log("Serializer : ", user)
        done(null, user.id);
    });

    //deserializes the user's session 
    passport.deserializeUser(function (id, done) {
        //done(null, id)
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            }
            else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'email', //defaults to email -- could potentially validate on either email or username
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the cb
        },
        function (req, email, password, done) {
            // function that generates a hash for the password before it goes into the db
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            // performs a search for the user
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, {
                        message: 'Sorry, that email is already taken'
                    });
                } else {
                    var userPassword = generateHash(password);
                    // the data that will be used to create a new user in the DB
                    var data = {
                        username: req.body.username,
                        email: email,
                        password: userPassword,
                        gender: req.body.gender,
                        user_image: req.body.user_image
                    };
                    // a method that actually creates a new record in the DB for a new user
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            var User = user;
            // production env password validator
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (!user.password === password) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                if (!user) {
                    return done(null, false, {
                        message: 'email does not exist'
                    });
                }
                var userinfo = user.get();
                return done(null, userinfo);
            })
                .catch(function (err) {
                    return done(null, false, {
                        message: "Whoops, something went wrong with your sign-in"
                    });
                });
        }

    ));
}