import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PlayerProvider from "@/components/PlayerProvider";

export const metadata = {
  metadataBase: new URL("https://cypherwire.com"),
  title: { default: "Cypher Wire — رسانه‌ی رپ فارسی", template: "%s | Cypher Wire" },
  description: "رسانه‌ی رپ فارسی — موزیک آرتیست‌ها و بیت‌های رایگان پرودیوسرها. صدای هیپ‌هاپ زیرزمینی.",
  openGraph: {
    title: "Cypher Wire — رسانه‌ی رپ فارسی",
    description: "موزیک آرتیست‌ها و بیت‌های رایگان پرودیوسرها. صدای هیپ‌هاپ زیرزمینی.",
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <PlayerProvider>
          <Nav />
          <main className="main">{children}</main>
          <Footer />
        </PlayerProvider>
      </body>
    </html>
  );
}
