import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DEFAULT_DATABASE_URL,
});

const createDatabase = async () => {
  await prisma.$executeRawUnsafe(
    `CREATE DATABASE "${process.env.DB_DATABASE}"`,
  );
};

createDatabase()
  .then(() => {
    console.log(
      chalk.bgGreen.bold(
        `База данных ${process.env.DB_DATABASE} успешно создана`,
      ),
    );
  })
  .catch((err) => {
    console.log(
      chalk.bgRed.bold(`Ошибка при создании базы данных: ${err.message}`),
    );
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
