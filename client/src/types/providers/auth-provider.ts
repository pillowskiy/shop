import type { NextPage } from "next";

export type Roles = {
  forAuth?: boolean;
}

export type NextPageAuth<P = {}> = NextPage<P> & Roles;

export type AuthFields = {
  Component: Roles;
}