import type { NextPage } from "next";

export type TRoles = {
  isOnlyUser?: boolean;
}

export type NextPageAuth<P = {}> = NextPage<P> & TRoles;

export type TAuthFields = {
  Component: TRoles;
}