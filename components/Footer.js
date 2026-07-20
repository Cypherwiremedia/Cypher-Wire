import Link from "next/link";
import { SUPPORT_CHANNELS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="logo-glitch small">CYPHER WIRE</span>
          <p>رسانه‌ی رپ فارسی — صدای آرتیست‌ها و پرودیوسرهای زیرزمینی.</p>
        </div>
        <div className="footer-links">
          <span className="footer-heading">دسترسی سریع</span>
          <Link href="/">خانه</Link>
          <Link href="/artists">آرتیست‌ها</Link>
          <Link href="/producers">پرودیوسرها</Link>
          <Link href="/support">پشتیبانی</Link>
        </div>
        <div className="footer-links">
          <span className="footer-heading">ارتباط</span>
          {SUPPORT_CHANNELS.map((c) => (
            <a key={c.id} href={c.href} target="_blank" rel="noopener noreferrer">{c.label}</a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">© ۲۰۲۶ Cypher Wire — تمام حقوق محفوظ است.</div>
    </footer>
  );
}
