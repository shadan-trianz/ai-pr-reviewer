"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class PR extends sequelize_1.Model {
}
PR.init({
    prid: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    response: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: "pullrequests",
});
exports.default = PR;
