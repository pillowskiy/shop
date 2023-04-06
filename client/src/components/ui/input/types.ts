import type { InputHTMLAttributes } from 'react';
import type { IconType } from 'react-icons';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: IconType;
  title: string;
  error?: string;
}