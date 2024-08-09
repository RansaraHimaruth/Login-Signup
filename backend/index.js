import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import UserRouter from "./routes/UserRoutes.js";
import ProductRouter from "./routes/ProductRoutes.js";
import AuthRouter from "./routes/AuthRoute.js";
import db from "./config/Database.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   try {
//     await db.sync();
//     console.log("Database connected");
//   } catch (err) {
//     console.log(err);
//   }
// })();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: "auto" },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(UserRouter);
app.use(ProductRouter);
app.use(AuthRouter);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
