import { Sequelize } from "sequelize";

console.log("hello");

export const sequelize = new Sequelize(
    "postgres://admin:WIZlrB54nQV6VmoQXRGH7AjC6In4P1oM@dpg-cjftkhocfp5c73el31n0-a.frankfurt-postgres.render.com/dev_xpxt?ssl=true"
);

export async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
