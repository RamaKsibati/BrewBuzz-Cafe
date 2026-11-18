import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.mjs";
import User from "./User.mjs";



const Business = sequelize.define(
    "Business",
    {
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clover_api_token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        merchant_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cover_photo: {
            type: DataTypes.STRING,
            defaultValue: "../uploads/default-image.jpeg",
        },
        status: {
            type: DataTypes.ENUM("active", "inactive", "deleted"),
            defaultValue: "active", // Businesses are active by default
        },
      
    },
    {
        tableName: "businesses",
        timestamps: true,
    }
);

// Lazy-load associations
export function setupBusinessAssociations(User, Review) {
    Business.belongsTo(User, { foreignKey: "user_id" });
    Business.hasMany(Review, { foreignKey: "business_id" });
}

export default Business;
