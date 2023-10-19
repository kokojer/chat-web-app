import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';

const prisma = new PrismaClient();

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
    console.log(chalk.bgGreen.bold(`Сиды успешно раскатаны`));
  })
  .catch((err) => {
    console.error(
      chalk.bgRed.bold(`Сиды не смогли раскатится: ${err.message}`),
    );
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
