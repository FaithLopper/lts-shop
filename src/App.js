import React from "react";
import AppRoutes from "./routes";
// import LoadingContainer from '_containers/app/LoadingContainer'
// import { useTranslation } from 'react-i18next'
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import RootRoute from "./routes/index";
import store from "./store";
import i18n from "./locales/i18n";

const App = () => {
  // const { t } = useTranslation('common')
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </I18nextProvider>
    </>
  );
};

export default () => <App />;
