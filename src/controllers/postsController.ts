import { PrismaClient } from "@prisma/client";
import express, { Request, Response, Router } from "express";

export class PostController {
    private router: Router;
    private dataBase: PrismaClient

    constructor (database: PrismaClient) {
        this.dataBase = database;
        this.router = express.Router();
        this.router.get("/", this.getPosts);
        this.router.post("/", this.addPost);
        this.router.delete("/:id", this.deletePost);
        this.router.put("/:id", this.updatePost);
    }

    public getRouter = () => {
        return this.router;
    }

    private getPosts = async (req: Request, res: Response) => {
        try {
            const users = await this.dataBase.post.findMany();
            return res.json(users);
        } catch (error) {
            const err = {
                message: "Посты не найдены"
            }
            return res.send(err);
        }
    }

    private addPost = async (req: Request, res: Response) => {
        try {
            const newUser = await this.dataBase.post.create({
                data: req.body
            })
            return res.json(newUser);
        } catch (error) {
            const err = {
                message: "ошибка создания поста"
            }
            return res.send(err);
        }
    }

    private deletePost = async (req: Request, res: Response) => {
        try {
            const deletedUser = await this.dataBase.post.delete({
                where: {
                    id: req.params.id
                }
            })
            return res.json(deletedUser);
        } catch (error) {
            const err = {
                message: "Пост не найден"
            }
            return res.send(err);
        }
    }

    private updatePost = async (req: Request, res: Response) => {
        try {
            const newUser = await this.dataBase.post.update({
                where: {
                    id: req.params.id
                },
                data: req.body
            })
            return res.json(newUser);
        } catch (error) {
            const err = {
                message: "Ошибка данных"
            }
            return res.send(err);
        }
    }
}