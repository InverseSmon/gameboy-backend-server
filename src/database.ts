import { Sequelize } from "sequelize";

console.log("hello");

export const sequelize = new Sequelize(
    process.env.DATABASE_URL || "postgres://postgres:postgres@postgres:5432/dev"
);

export async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
