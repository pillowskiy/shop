export type ICategoryUpdate = Pick<ICategory, 'name'>

export interface ICategory {
  id: number;
  name: string;
  slug: string;
};