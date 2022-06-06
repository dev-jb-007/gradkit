//import modules
const os = require("os");
const cluster = require("cluster");
if (cluster.isMaster) {
  const n_cpus = os.cpus().length;
  console.log("Forking " + n_cpus + " CPUS");
  for (let i = 0; i < n_cpus; i++) {
    cluster.fork();
  }
} else {
  require("dotenv").config();
  const express = require("express");
  const mongoose = require("mongoose");
  const morgan = require("morgan");
  const session = require("express-session");
  const passport = require("passport");
  const template = require("./watermark.json");
  const path = require("path");
  const fs = require("fs");
  const https = require("https");
  const cors = require("cors");
  const Code = require("./models/codes");
  const Solution = require("./models/solution");

  const client = require("twilio")(
    process.env.ACCOUNT_SID,
    process.env.AUTH_TOKEN
  );
  // const client=require("twilio")(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN);
  //import routes
  const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, "certificate.pem")),
    key: fs.readFileSync(path.join(__dirname, "privatekay.pem")),
  };
  const videoRoutes = require("./routes/video");
  const authRoutes = require("./routes/auth");
  const questionRoutes = require("./routes/question");
  const generalRoutes = require("./routes/general");
  const cookieParser = require("cookie-parser");
  const errorMiddleware = require("./middlewares/error");

  //db connection
  mongoose.connect("" + process.env.MONGODB_URL, {}, () => {
    console.log("Connected to DB");
  });

  //Model
  const User = require("./models/user");

  //app
  const app = express();

  //middleware
  // app.enable('trust proxy');
  // app.use((req, res, next) => {
  //     req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
  // })
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //session config
  app.use(
    session({
      cookie: { maxAge: 6000000 },
      secret: "TheSecretStringRequiredToWork",
      resave: true,
      saveUninitialized: false,
    })
  );

  //passport setup
  require("./helpers/passport_config");
  app.use(passport.initialize());
  app.use(passport.session());

  const addView = require("./helpers/views");
  const nonlogged = require("./models/nonlogged");

  //routes middleware
  app.use("/api/video", videoRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/question", questionRoutes);
  app.use("/api/general", generalRoutes);

  app.post("/phoneVerify", async (req, res, next) => {
    let num = "+91" + req.body.number;
    client.messages
      .create({
        body: "This is the ship that made the Kessel Run in fourteen parsecs?",
        from: "+18065152334",
        to: "+919978900829",
      })
      .then((message) => res.send(message));
  });
  app.get("/google", async (req, res, next) => {
    res.sendFile(path.join(__dirname, "/public/google.html"));
  });
  app.post("/google/register", async (req, res, next) => {
    try {
      let user = await User.findOne({ email: req.body.profile.tv });
      if (user) {
        user.tokens.push({ token: req.body.id_token });
        res.cookie("jwt", req.body.id_token, {
          expires: new Date(Date.now() + 5000000000),
          httpOnly: true,
        });
        await user.save();
      } else {
        let tk = new Array();
        tk.push({ token: req.body.id_token });
        let user = new User({
          name: req.body.profile.tf,
          email: req.body.profile.tv,
          tokens: tk,
        });
        res.cookie("jwt", req.body.id_token, {
          expires: new Date(Date.now() + 5000000000),
          httpOnly: true,
        });
        await user.save();
        //Error here:- Dev Patel (12 May 2022)
      }
      res.send(user);
    } catch (err) {
      next(err);
    }
  });

  // app.post('/phoneVerify',async (req,res,next)=>{
  //   let num="+91"+req.body.number;
  //   client.messages
  //   .create({
  //      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  //      from: '+18065152334',
  //      to: '+919978900829'
  //    })
  //   .then(message =>res.send(message));
  // })

  app.use("/", generalRoutes);
  app.get("/emailVerify/:code", async (req, res, next) => {
    try {
      let code = req.params.code;
      let found = await Code.findOne({ code });
      let status;
      if (found) {
        status = "Done";
      } else {
        status = "Fail";
      }
      res.send(status);
    } catch (err) {
      next(err);
    }
  });

  app.post("/watermark", async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  });

  //Dev---------------------------------------------------------
  app.get("/addview", async (req, res, next) => {
    try {
      const token = req.cookies.visitorId;
      const id = "61fa0fe147328bc7cc797cc7";
      const sol = await Solution.findById(id);

      const user = await nonlogged.findOne({ id: token });
      if (user === null) {
        let arr = new Array();
        arr.push(id);
        let usr = new nonlogged({
          id: token,
          videos: arr,
        });
        sol.view++;
        await sol.save();
        await usr.save();
      } else {
        let temp = user.videos.find((item) => {
          return item == id;
        });
        if (!temp) {
          user.videos.push(id);
          await user.save();
          sol.view++;
          await sol.save();
        }
      }
      res.send(token);
    } catch (err) {
      next(err);
    }
  });

  //
  app.use(errorMiddleware);

  // -------------------------------------------------------------------

  // Handling uncaught error
  // process.on("uncaughtException", (err) => {
  //   console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  //   console.log(err.name, err.message);
  //   process.exit(1);
  // });

  app.use(function (err, req, res, next) {
    res.status(err.status).send({ status: err.status, error: err.message });
  });

  //port
  const port = process.env.PORT || 5000;
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
  // https.createServer(httpsOptions, app)
  //     .listen(5001, () => {
  //         console.log('HTTPS Server started on port 5000');
  //     })
  app.listen(5001, () => console.log(`Listening on port ${port}`));

  // const secureServer = https.createServer({
  //   key: fs.readFileSync(path.join(__dirname, './cert/key.pem')),
  //   cert: fs.readFileSync(path.join(__dirname, './cert/cert.pem')),
  // }, app);

  // secureServer.listen(port, () => console.log(`Secure server 🚀🔑 on port ${port}`))

  // Unhandled Promise Rejection
  // process.on("unhandledRejection", (err) => {
  //   console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  //   console.log(err.name, err.message);
  //   server.close(() => {
  //     process.exit(1);
  //   });
  // });

  // process.on("SIGTERM", () => {
  //   console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  //   server.close(() => {
  //     console.log("💥 Process terminated!");
  //   });
  // });
}
