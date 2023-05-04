import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {isAxiosError} from "axios";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function rejectAxios(err: unknown) {
  if (isAxiosError(err) && err.response) {
    return { message: err.response.data.error.message as string };
  }
  throw err;
}