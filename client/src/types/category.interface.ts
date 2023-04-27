export type CategoryUpdate = Pick<Category, 'name'>

export interface Category {
  id: number;
  name: string;
  slug: string;
};