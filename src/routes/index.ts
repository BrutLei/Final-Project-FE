import { HelloPage, LoginPage } from "../pages";

export const routes = [
  {
    path: "/login",
    page: LoginPage,
    layout: null,
  },
  {
    path: "*",
    page: HelloPage,
    layout: null,
  },
];
