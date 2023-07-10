import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UsersController } from "./controllers/usersController";
import prisma from "./dataBase/prisma";
import { PostController } from "./controllers/postsController";

dotenv.config();

class App {
    private app: Express;

    constructor () {
        this.app = express();
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static("public"));
        this.app.use(express.json());
        this.app.use(cors());
    }

    public init = async () => {
        try {
            this.app.listen(process.env.API_PORT, () => {
                console.log(`server is started on port ${process.env.API_PORT}`);
            })
            this.app.use("/api/users", new UsersController(prisma).getRouter());
            this.app.use("/api/posts", new PostController(prisma).getRouter());
            process.on("beforeExit", async () => {
                await prisma.$disconnect();
            })
        } catch (error: unknown) {
            const err = error as Error;
            console.log(err.message);
        }
    }
}

export const app = new App();

app.init().then(() => {
    console.log("Server is ok");
}).catch(() => {
    console.log("server is not ok");
})