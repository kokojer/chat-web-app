"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const chalk_1 = require("chalk");
const prisma = new client_1.PrismaClient();
const mainSeed = async () => {
    await prisma.users.createMany({
        data: [
            {
                username: 'Alice',
                password: 'wefweqhqwefwf',
            },
            {
                username: 'Bob',
                password: 'wefweqhqwefwf',
            },
            {
                username: 'Ivan',
                password: 'wefweqhqwefwf',
            },
            {
                username: 'Vasian',
                password: 'wefweqhqwefwf',
            },
        ],
    });
};
mainSeed()
    .then(() => {
    console.log(chalk_1.default.bgGreen.bold(`Сиды успешно раскатаны`));
})
    .catch((err) => {
    console.error(chalk_1.default.bgRed.bold(`Сиды не смогли раскатится: ${err.message}`));
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map