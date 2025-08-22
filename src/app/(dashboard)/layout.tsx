import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/menu";
import Navbar from "@/components/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/*left*/}
      <div className="w-1/6 p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={30} height={30} />
          <span className="hidden lg:block">Smart Class</span>
        </Link>
        <Menu />
      </div>

      {/*right*/}
      <div className="w-5/6 bg-[#F7F8FA] overflow-scroll">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
