import { AuthLayout } from "@/layouts";
import { HelloPage, LoginPage, VerifyEmail } from "@/pages";

export const routes = [
  {
    path: "/login",
    page: LoginPage,
    layout: AuthLayout,
  },
  {
    path: "/verify-email",
    page: VerifyEmail,
    layout: AuthLayout,
  },
  {
    path: "*",
    page: HelloPage,
    layout: null,
  },
];
