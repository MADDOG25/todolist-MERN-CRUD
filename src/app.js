import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.Routes.js";

const app = express();

//PERMITE SOLICITUDES DE RECURSOS CRUZADOS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
//CONVIERTE LOS REQUEST BODY EN FORMATO JSON
app.use(express.json());
//MUESTRA LA PETICION QUE HA LLEGADO A CONSOLA
app.use(morgan("dev"));
//CONVIERTE LAS COOKIES
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;
