import express from "express";
import { PORT } from "./config";

import { databaseConnection } from "./database";

import { expressApp } from "./express-app";


const startServer = async () => {
    try {
        const app = express()
        await databaseConnection()
        expressApp(app);

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
        .on("error", (err) => {
            console.log(err)
            process.exit(1)
        })

    } catch (error) {
        console.log(error)
    }

}
startServer();

