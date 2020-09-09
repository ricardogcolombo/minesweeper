var bodyParser = require("body-parser");
const morgan = require("morgan");
// setup global middleware here
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const db = require("./models");
const User = db.user;

const initBasicMiddleware= (app, HOST, PORT) =>{
    app.use(morgan("common"));
    const swaggerOps = {
        swaggerDefinition: {
            info: {
                title: "Minesweeper API",
                description: "MinesweeperAPI Documentation",
                servers: [`http://${HOST}:${PORT}/api/v1`],
            },
        },
        apis: ["api/api.js"],
    };
    const swaggerDoc = swaggerJsDoc(swaggerOps);
    app.use(bodyParser.json());
    app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        type:'error',
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          type:'error',
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

module.exports={
    checkDuplicateUsernameOrEmail,
    initBasicMiddleware
}
