import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import slugify from '../src/utils/slugify';
import { calculatePrice } from '../src/utils/productPrice';
const prisma = new PrismaClient();

function randomInt(max: number) {
  return Math.floor(Math.random() * max) + 1;
}

const createProduct = async (count: number) => {
  for (; count > 0; --count) {
    const productName = faker.commerce.productName();
    const categoryName = faker.commerce.department();

    const randomPercent = randomInt(100);
    const productPrice = calculatePrice(
      +faker.commerce.price(),
      randomPercent < 30 ? 0 : randomPercent,
    );

    await prisma.product.create({
      data: {
        name: productName,
        ownerId: 1,
        slug: slugify(productName),
        description: faker.commerce.productDescription(),
        images: Array.from({ length: randomInt(6) }, () =>
          faker.image.imageUrl(500, 500, slugify(categoryName), true),
        ),
        ...productPrice,
        quantity: randomInt(1000),
        sold: randomInt(10000),
        categories: {
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
