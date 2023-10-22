"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
const chalk_1 = require("chalk");
const server = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    await app.listen(4001);
};
server()
    .then(() => {
    console.info(chalk_1.default.bgGreen.bold(`Сервер запущен на порту ${process.env.npm_package_config_port}`));
})
    .catch((err) => {
    console.info(chalk_1.default.bgRed.bold(`Ошибка при запуске сервера ${err.message}`));
});
//# sourceMappingURL=main.js.map