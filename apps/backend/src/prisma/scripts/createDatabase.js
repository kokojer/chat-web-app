"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const chalk_1 = require("chalk");
const prisma = new client_1.PrismaClient({
    datasourceUrl: process.env.DEFAULT_DATABASE_URL,
});
const createDatabase = async () => {
    await prisma.$executeRawUnsafe(`CREATE DATABASE "${process.env.DB_DATABASE}"`);
};
createDatabase()
    .then(() => {
    console.log(chalk_1.default.bgGreen.bold(`База данных ${process.env.DB_DATABASE} успешно создана`));
})
    .catch((err) => {
    console.log(chalk_1.default.bgRed.bold(`Ошибка при создании базы данных: ${err.message}`));
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=createDatabase.js.map