import type { InputHTMLAttributes } from 'react';
import type { IconType } from 'react-icons';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: string;
  Icon?: IconType;
  error?: string;
}