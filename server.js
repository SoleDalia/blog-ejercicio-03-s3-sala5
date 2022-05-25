require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 3022;
const app = express();

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User, Role } = require("./models");
const bcrypt = require("bcryptjs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//////////////////////////////////////////////////////////////////////

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function verify(
    email,
    password,
    done
  ) {
    //consulta db

    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      return done(null, false, { message: "Email not register" });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      return done(null, user);
    }
    return done(null, false, { message: "error in email or password" });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  console.log(id);
  User.findByPk(id, {
    include: {
      model: Role,
      attributes: [
        "read",
        "write",
        "edit",
        "main",
        "writeComment",
        "editComment",
      ],
    },
  })
    .then((user) => {
      done(null, user); // Usuario queda disponible en req.user.
    })
    .catch((error) => {
      done(error, User);
    });
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  })
);
app.use(passport.session());

///////////////////////////////////////////////////////////////////////

routes(app);

dbInitialSetup(); // Crea tablas e inserta datos de prueba.

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
