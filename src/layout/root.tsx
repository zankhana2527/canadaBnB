import Link from "@/components/atoms/link";
import Logo from "@/components/atoms/logo";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <header className="px-12 py-4 border-b border-b-slate-300 bg-slate-50">
        <div className="flex items-center justify-between">
          <Logo />
          <Link href="#" label="List your room" />
        </div>
      </header>
      <main>
        <div className="px-12 py-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
