import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { fastifyCookie } from "@fastify/cookie";
const chalk = require("chalk");

const server = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie, {
    secret: process.env.SECRET_KEY,
  });

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  await app.listen(process.env.BACKEND_PORT);
};

server()
  .then(() => {
    console.info(
      chalk.bgGreen.bold(`Сервер запущен на порту ${process.env.BACKEND_PORT}`),
    );
  })
  .catch((err) => {
    console.info(chalk.bgRed.bold(`Ошибка при запуске сервера ${err.message}`));
  });
