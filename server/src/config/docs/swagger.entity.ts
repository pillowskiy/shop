// TEMP: automate

import {
  Category,
  Comment,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  Review,
  Role,
  Payment,
  PaymentType,
  User,
  Gender,
  PromoCode,
  Shipping,
} from '@prisma/client';

type OmitKeys = 'productId' | 'helpfulId' | 'paymentId';
type SwaggerSchema<T, K extends keyof T = null> = Omit<T, OmitKeys | K>;

export const shipping: SwaggerSchema<Shipping, 'updatedAt'> = {
  id: 1,
  city: 'Lviv',
  state: 'Lvivska',
  country: 'UA',
  temp: true,
  name: 'Shop',
  surname: 'User',
  phone: '+380500000000',
  userId: 1,
  createdAt: new Date(),
};

export const user: SwaggerSchema<User, 'password' | 'updatedAt'> = {
  createdAt: new Date(),
  id: 1,

  email: 'shop_user@gmail.com',
  name: 'ShopUser',
  avatarURL: 'http://localhost:8080/api/uploads/some_image.png',
  phone: '+380500000000',

  birthDate: new Date(1970, 1, 1),
  aboutMe: 'Hi there',

  gender: Gender.Male,
  roles: [Role.User],
};

export const payment: SwaggerSchema<Payment, 'updatedAt'> = {
  id: 1,
  cardNumber: '12341111111111',
  cardExpiresAt: new Date(),
  cardCvv: '000',
  type: PaymentType.MAGIC,
  userId: user.id,

  temp: false,

  createdAt: new Date(),
};

export const category: SwaggerSchema<Category, 'createdAt' | 'updatedAt'> = {
  id: 1,
  name: 'Toys',
  slug: 'toys',
};

type ProductEntity = SwaggerSchema<Product, 'updatedAt'> & {
  categories: (typeof category)[];
};
export const product: ProductEntity = {
  id: 1,
  ownerId: user.id,
  images: [
    'http://localhost:8080/api/uploads/0ee9ce7b404d5202554d4c9ea5e9f166.png',
  ],
  quantity: 100,
  name: 'Product Name',
  price: 1000,
  discountPercent: 10,
  finalPrice: 900,
  description: 'The best product',
  createdAt: new Date(),
  slug: 'product-name',
  sold: 300,
  categories: [category],
};

export const comment: SwaggerSchema<Comment, 'userId'> & {
  author: typeof user;
} = {
  id: 1,
  author: user,
  authorId: user.id,
  text: 'This sellet is really good',
  rating: 4,

  createdAt: new Date(),
  updatedAt: new Date(),
};

type ReviewEntity = SwaggerSchema<Review, 'updatedAt' | 'userId'> & {
  helpful: Pick<typeof user, 'id' | 'name'>[];
  user: typeof user;
};
export const review: ReviewEntity = {
  id: 1,
  text: 'Beautiful product!',
  rating: 5,
  attachments: ['https://somewhere.png/cars/1'],
  user,
  helpful: [
    {
      id: user.id,
      name: user.name,
    },
  ],

  createdAt: new Date(),
};

export const promoCode: SwaggerSchema<PromoCode, 'updatedAt'> = {
  id: 1,
  name: 'SUMMER2023',
  activationLimit: 100,
  discountPercent: 10,
  ownerId: user.id,

  expiresAt: new Date(2050, 1, 1),
  createdAt: new Date(),
};

type OrderItemEntity = SwaggerSchema<OrderItem, 'createdAt' | 'updatedAt'> & {
  product: typeof product;
};
export const orderItem: OrderItemEntity = {
  id: 1,
  orderId: 1,
  product,
  price: product.finalPrice,
  quantity: 1,
};

type OrderEntity = SwaggerSchema<Order, 'shippingId' | 'promoCodeId'> & {
  payment: typeof payment;
  items: (typeof orderItem)[];
  promoCode: typeof promoCode;
  shipping: typeof shipping;
};
export const order: OrderEntity = {
  id: 1,

  payment,
  items: [orderItem],
  shipping,
  promoCode,

  status: OrderStatus.PENDING,
  userId: user.id,

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const jwt = {
  refreshToken: '...kpXVCJ9.eI6MSwiaWF0IjoxNjgyMzUwNzU5LC...',
  accessToken: '...kpXVCJ9.eI6MSwiaWF0IjoxNjgyMzUwNzU5LC...',
};
