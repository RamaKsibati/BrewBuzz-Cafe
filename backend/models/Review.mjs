// models/Review.mjs
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.mjs";
import User from "./User.mjs";
import Business from "./Business.mjs";

const Review = sequelize.define(
    "Review",
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
        business_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Business,
                key: "id",
            },
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "reviews",
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Associations
User.hasMany(Review, { foreignKey: "user_id", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "user_id" });

Business.hasMany(Review, { foreignKey: "business_id", onDelete: "CASCADE" });
Review.belongsTo(Business, { foreignKey: "business_id" });

export default Review;
