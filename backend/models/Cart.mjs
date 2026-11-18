// models/Cart.mjs
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.mjs";
import User from "./User.mjs";
import Business from "./Business.mjs";

const Cart = sequelize.define("Cart", {
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
    item_id: {
        type: DataTypes.STRING, // Clover's item ID
        allowNull: false,
    },
    item_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    modifiers: {
        type: DataTypes.JSONB, // Store selected modifiers
        allowNull: true,
    },
});



User.hasMany(Cart, { foreignKey: "user_id"});
Cart.belongsTo(User, { foreignKey: "user_id" });

Business.hasMany(Cart, { foreignKey: "business_id", onDelete: "CASCADE" });
Cart.belongsTo(Business, { foreignKey: "business_id" });



export default Cart;
