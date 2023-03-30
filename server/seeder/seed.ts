import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

function randomInt(max: number) {
  return Math.floor(Math.random() * max) + 1;
}

function slugify(string: string) {
  return string
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-');
}

const createProduct = async (count: number) => {
  for (; count > 0; --count) {
    const productName = faker.commerce.productName();
    const categoryName = faker.commerce.department();

    await prisma.product.create({
      data: {
        name: productName,
        slug: slugify(productName),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(),
        images: Array.from({ length: randomInt(6) }, () =>
          faker.image.imageUrl(),
        ),
        quantity: randomInt(100),
        sold: randomInt(10000),
        category: {
          create: {
            name: categoryName,
            slug: slugify(categoryName),
          },
        },
        reviews: {
          create: Array.from({ length: randomInt(5) }, () => {
            return {
              rating: faker.datatype.number({ min: 1, max: 5 }),
              text: faker.lorem.paragraph(),
            };
          }),
        },
      },
    });
  }
  console.log('Products created');
};

(async () => {
  console.log('Seeding database...');
  await createProduct(10);
  console.log('Database seeded');
})()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());