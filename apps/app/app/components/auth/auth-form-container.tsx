import type React from "react";

export function AuthFormContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center w-full h-screen">
      <div className="container">{children}</div>
    </div>
  );
}
