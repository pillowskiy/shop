import {
  Category,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  Review,
  Role,
  User,
  Gender,
} from '@prisma/client';

type OmitKeys =
  | 'updatedAt'
  | 'userId'
  | 'productId'
  | 'orderId'
  | 'helpfulId'
  | 'paymentId';
type SwaggerSchema<T, K extends keyof T = null> = Omit<T, OmitKeys | K>;

export const user: SwaggerSchema<User, 'password'> = {
  id: 1,
  email: 'shop_user@gmail.com',
  name: 'User',
  avatarURL: 'https://somewhere.png/',
  phone: '0123456789' || null,
  roles: [Role.User],

  aboutMe: 'Some text',
  gender: Gender.Male,
  birthDate: new Date(1970, 0, 1),

  createdAt: new Date(),
};

export const product: SwaggerSchema<Product> = {
  id: 1,
  name: 'Car',
  slug: 'car',
  description: 'Beautiful car',
  price: 1020,
  discountPercent: 0,
  finalPrice: 1020,
  images: ['https://somewhere.png/cars/1', 'https://somewhere.png/cars/1'],
  quantity: 5,
  sold: 10235,

  ownerId: 1,

  createdAt: new Date(),
};

export const category: SwaggerSchema<Category> = {
  id: 1,
  name: 'Toys',
  slug: 'toys',

  createdAt: new Date(),
};

export const review: SwaggerSchema<Review> = {
  id: 1,
  rating: 4.2,
  text: 'Beautiful product!',
  attachments: ['https://somewhere.png/cars/1'],

  createdAt: new Date(),
};

export const order: SwaggerSchema<Order> = {
  id: 1,
  status: OrderStatus.PENDING,
  promoCodeId: 1,
  createdAt: new Date(),
  shippingId: 1,
};

export const orderItem: SwaggerSchema<OrderItem> = {
  id: 1,
  quantity: 2,
  price: 1020,

  createdAt: new Date(),
};

export const jwt = {
  refreshToken: '...kpXVCJ9.eI6MSwiaWF0IjoxNjgyMzUwNzU5LC...',
  accessToken: '...kpXVCJ9.eI6MSwiaWF0IjoxNjgyMzUwNzU5LC...',
};
