import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/indexRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes";
import { logger } from "./utils/logs";
class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
  }

  routes() {
    this.app.use("/", indexRoutes);
    this.app.use("/api/usuario", usuarioRoutes);
    this.app.use("/api/auth", authRoutes);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
      logger.info('Server en puerto 3000')
    });
  }
}

const server = new Server();
server.start();
