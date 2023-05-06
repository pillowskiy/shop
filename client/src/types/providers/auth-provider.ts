import type { NextPage } from "next";

export type NextPageAuth<P = {}> = NextPage<P> & AuthFields;

export type AuthFields = {
  forAuth: boolean;
}