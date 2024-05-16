import React, { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-svh w-svw">
      {children}
    </div>
  );
};

export default AuthLayout;
