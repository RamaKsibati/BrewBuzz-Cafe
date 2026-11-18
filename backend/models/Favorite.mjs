import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.mjs";
import User from "./User.mjs";
import Business from "./Business.mjs";

const Favorite = sequelize.define(
    "Favorite",
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

        businessId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Business,
                key: "id",
            },
        },
    },
    {
        tableName: "favorites",
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Define associations
User.hasMany(Favorite, { foreignKey: "user_id", onDelete: "CASCADE" });
Favorite.belongsTo(User, { foreignKey: "user_id" });

Business.hasMany(Favorite, { foreignKey: "businessId", onDelete: "CASCADE" });
Favorite.belongsTo(Business, { foreignKey: "businessId" });

export default Favorite;
