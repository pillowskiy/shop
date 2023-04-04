export type QueryValue = IArgumentsById | IArgumentsBySlug;

interface IArgumentsById {
  type: 'id';
  value: number;
};

interface IArgumentsBySlug {
  type: 'slug';
  value: string;
};

export type ICategoryUpdate = Pick<ICategory, 'name'>

export interface ICategory {
  id: number;
  name: string;
  slug: string;
};