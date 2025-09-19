import { ReactNode } from 'react';

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[1400px] px-10 py-[100px] max-md:px-5">
      {children}
    </div>
  );
}
