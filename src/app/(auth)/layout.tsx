import { ReactNode } from "react";

export default function Authlayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center h-[80%] mt-20">
      {children}
    </div>
  );
}
