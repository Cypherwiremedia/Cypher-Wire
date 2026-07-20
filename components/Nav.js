"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mic2, Disc3, LifeBuoy } from "lucide-react";

export default function Nav() {
  const pathname = usePathname();
  const isActive = (prefix) => (prefix === "/" ? pathname === "/" : pathname.startsWith(prefix));

  return (
    <>
      <div className="wire-top" />
      <header className="nav">
        <Link href="/" className="nav-logo">
          <span className="logo-glitch">CYPHER WIRE</span>
        </Link>
        <nav className="nav-links">
          <Link href="/" className={isActive("/") ? "active" : ""}><Home size={16} /><span> خانه</span></Link>
          <Link href="/artists" className={isActive("/artists") ? "active" : ""}><Mic2 size={16} /><span> آرتیست‌ها</span></Link>
          <Link href="/producers" className={isActive("/producers") ? "active" : ""}><Disc3 size={16} /><span> پرودیوسرها</span></Link>
          <Link href="/support" className={isActive("/support") ? "active" : ""}><LifeBuoy size={16} /><span> پشتیبانی</span></Link>
        </nav>
      </header>
    </>
  );
}
