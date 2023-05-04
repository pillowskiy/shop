import { type TypedUseSelectorHook, useSelector as useNativeSelector } from 'react-redux';
import type { RootState } from '@redux/store';
export const useSelector: TypedUseSelectorHook<RootState> = useNativeSelector;
