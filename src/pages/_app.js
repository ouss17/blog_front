import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import DarkmodeContext from "@/context/darkmodeContext";
import PageContext from "@/context/pageContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import stylesDark from "@/styles/Darkmode.module.css";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import user from "../reducers/user";

const reducers = combineReducers({ user });
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
          </DarkmodeContext.Provider>
        </PageContext.Provider>
      </PersistGate>
    </Provider>
  );
}
