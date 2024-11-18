import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import DarkmodeContext from "@/context/darkmodeContext";
import PageContext from "@/context/pageContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function App({ Component, pageProps }) {
  const [darkmode, setDarkmode] = useState(false);
  const pathname = usePathname();
  const [page, setPage] = useState(pathname);

  useEffect(() => {
    setPage(pathname);
  }, [pathname]);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      <DarkmodeContext.Provider value={{ darkmode, setDarkmode }}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </DarkmodeContext.Provider>
    </PageContext.Provider>
  );
}
