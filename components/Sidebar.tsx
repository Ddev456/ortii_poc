'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Sidebar = () => {
    const pathName = usePathname();
    return (
    <div className="sidebar w-[200px] h-screen bg-white p-4">
      <div className="sidebar-content flex flex-col justify-between h-full gap-8">
        <div className="logo">
          <img src="/logo_.svg" alt="ortii" />
        </div>
        <div className="links font-medium text-sm text-[#17456F] flex flex-col gap-[1rem] mt-12">
          <Link href="/database" className="flex items-center gap-2">
                <Image src="/wikiIcon.svg" alt="ortii" width={25} height={25} />
                <span>Wiki</span>
          </Link>
          <Link href="/calendar" className={cn("flex items-center gap-2", { "text-indigo-500 font-black": pathName === "/calendar" })}>
                <Image src="/calendarIcon.svg" alt="ortii" width={25} height={25} />
                <span>Carnet</span>
          </Link>
          <Link href="#" className="flex items-center gap-2">
                <Image src="/shareIcon.svg" alt="ortii" width={25} height={25} />
                <span>Partage</span>
          </Link>
        </div>
        <div className="flex bg-indigo-50 p-4 rouded-md">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image src="/userIcon.svg" alt="ortii" width={25} height={25} />
              <span>Mon profil</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/settingsIcon.svg" alt="ortii" width={25} height={25} />
              <span>Paramètres</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};