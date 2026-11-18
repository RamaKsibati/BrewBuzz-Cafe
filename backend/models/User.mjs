import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.mjs";

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_category: {
            type: DataTypes.ENUM("Customer", "Business", "Admin"),
            allowNull: false,
        },
    },
    {
        tableName: "users",
        timestamps: true,
    }
);

export default User;
