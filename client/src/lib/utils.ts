import {ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {isAxiosError} from "axios";
 
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const rejectAxios = (err: unknown) => {
  if (isAxiosError(err) && err.response) {
    return err.response.data;
  }
  throw err;
}

export const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
}

export const getSlugFromQuery = (slug: string | string[] | undefined) => {
  return typeof slug === "string" ? slug : Array.isArray(slug) ? slug[0] : "";
}