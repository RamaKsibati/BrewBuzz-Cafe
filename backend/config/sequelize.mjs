import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Set to true in production
            },
        },
        logging: false, // Disable query logging in production
    }
);

// Function to connect and sync database
export async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Database connection has been established successfully.");
        await sequelize.sync({ alter: true }); // Sync models
        console.log("Database synced successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
        throw error; // Re-throw the error to catch it in server.mjs
    }
}

export default sequelize;
