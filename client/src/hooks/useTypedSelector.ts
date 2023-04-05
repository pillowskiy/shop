import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import type { TRootState } from '../store/store';
export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;