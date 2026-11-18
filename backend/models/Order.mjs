// models/Order.mjs
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.mjs";
import User from "./User.mjs";
import Business from "./Business.mjs";

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    business_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Business,
            key: "id",
        },
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    items: {
        type: DataTypes.JSONB, // Stores ordered items and modifiers
        allowNull: false,
    },
    receipt_url: {
        type: DataTypes.STRING, // Store S3 URL or generated file URL
    },
}, {
    tableName: "orders",
    timestamps: true,
});

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Business.hasMany(Order, { foreignKey: "business_id" });
Order.belongsTo(Business, { foreignKey: "business_id" });

export default Order;
