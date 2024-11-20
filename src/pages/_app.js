import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import DarkmodeContext from "@/context/darkmodeContext";
import PageContext from "@/context/pageContext";
import articles from "@/reducers/articles";
import stylesDark from "@/styles/Darkmode.module.css";
import "@/styles/globals.css";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import user from "../reducers/user";

const reducers = combineReducers({ user, articles });
const persistConfig = { key: "carnet-des-mots", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);
export default function App({ Component, pageProps }) {
  const [darkmode, setDarkmode] = useState(false);
  const pathname = usePathname();
  const [page, setPage] = useState(pathname);

  useEffect(() => {
    setPage(pathname);
  }, [pathname]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PageContext.Provider value={{ page, setPage }}>
          <DarkmodeContext.Provider value={{ darkmode, setDarkmode }}>
            <Header />
            <main
              className={`
    ${darkmode ? stylesDark.darkmode : stylesDark.whitemode}`}
            >
              <Component {...pageProps} />
            </main>
            <Footer />
            <Toaster />
          </DarkmodeContext.Provider>
        </PageContext.Provider>
      </PersistGate>
    </Provider>
  );
}
