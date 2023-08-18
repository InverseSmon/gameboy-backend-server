import express, { Request } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares";
import api from "./api";
import MessageResponse from "./interfaces/MessageResponse";
import { sequelize, testConnection } from "./database";
import { syncDb, Mod, Supplier, CustomerRequest } from "./models";
import { StringDataType } from "sequelize";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>("/", (req, res) => {
    res.json({
        message: "sweaty balls",
    });
});

app.get<{}, any>("/products/:productType", async (req: any, res) => {
    const { productType } = req.params;
    const list = await Mod.findAll({
        include: Supplier,
        where: { productType: productType },
    });
    console.log(productType);
    return res.json(list);
});

app.get<{}, any>("/products", async (req, res) => {
    const products = await Mod.findAll();
    return res.json(products);
});

app.get<{}, any>("/info", async (req, res) => {
    const products = await Mod.findAll({
        attributes: ["name", "Supplier.website"],
        include: Supplier,
    });
    return res.json(products);
});

app.get<{}, any>("/suppliers", async (req, res) => {
    const suppliers = await Supplier.findAll();
    return res.json(suppliers);
});

app.post<{}, any>("/requests", async (req, res) => {
    console.log(req.body);
    const request = await CustomerRequest.create({ ...req.body });
    return res.json(request);
});

/*
app.post<{}, any>("/users", async (req, res) => {
    const user = await User.create({ ...req.body });
    return res.json(user);
});*/

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
testConnection();
syncDb();
export default app;
