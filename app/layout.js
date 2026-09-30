import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://portfolio-rajaafrajanjua.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Raja Afra Janjua – Mobile & Full-Stack Developer",
    template: "%s | Raja Afra Janjua",
  },
  description:
    "Portfolio of Raja Afra Janjua — Mobile and Full-Stack Developer with 2 years of experience. Skilled in React Native, Flutter, React.js, PHP, and Laravel. Currently working at CrocusZone and JBMinds. Explore published apps, web projects, and more.",
  keywords: [
    "Raja Afra Janjua",
    "Mobile Developer",
    "Flutter Developer",
    "React Native Developer",
    "Full Stack Developer",
    "React.js",
    "PHP Laravel",
    "Android App Developer",
    "Portfolio",
    "Lahore Pakistan",
  ],
  authors: [{ name: "Raja Afra Janjua", url: siteUrl }],
  creator: "Raja Afra Janjua",
  publisher: "Raja Afra Janjua",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Raja Afra Janjua – Portfolio",
    title: "Raja Afra Janjua – Mobile & Full-Stack Developer",
    description:
      "Portfolio of Raja Afra Janjua — Mobile and Full-Stack Developer specializing in React Native, Flutter, React.js, PHP, and Laravel. Explore published apps and web projects.",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Raja Afra Janjua – Mobile & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raja Afra Janjua – Mobile & Full-Stack Developer",
    description:
      "Portfolio of Raja Afra Janjua — Mobile and Full-Stack Developer specializing in React Native, Flutter, React.js, PHP, and Laravel.",
    images: ["/profile.png"],
    creator: "@rajaafrajanjua",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
          <SpeedInsights />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
