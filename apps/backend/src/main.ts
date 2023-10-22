import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";
import chalk from "chalk";

const server = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(4001);
};

server()
  .then(() => {
    console.info(chalk.bgGreen.bold(`Сервер запущен на порту ${4001}`));
  })
  .catch((err) => {
    console.info(chalk.bgRed.bold(`Ошибка при запуске сервера ${err.message}`));
  });
