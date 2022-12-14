import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Utils from "../utils";
import { setShowModal as _setShowModal } from "../reducers/appCommon";
import MobileInvalidPathPage from "../components/common/mobile/appLayout/components/pages/InvalidPathPage";
const { isMobileDevice } = Utils;
const isMobile = isMobileDevice();

const TransitionRoute = ({ getRedirect, routes }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const routesArr = Object.values(routes);
  const setShowModal = (value) => {
    dispatch(_setShowModal(value));
  };
  useEffect(() => {
    const additionalClassNameBodyTag = isMobile ? "bd-mobile" : "bd-desktop";
    // const additionalClassNameBodyTag = 'bd-desktop'
    document.body.classList.add(additionalClassNameBodyTag);
  }, []);

  return isMobile ? (
    <SwitchMobileRoute
      routesArr={routesArr}
      location={location}
      getRedirect={getRedirect}
      setShowModal={setShowModal}
      routes={routes}
      dispatch={dispatch}
    />
  ) : (
    <SwitchDesktopRoute
      routesArr={routesArr}
      location={location}
      getRedirect={getRedirect}
      routes={routes}
      dispatch={dispatch}
    />
  );
};

const SwitchDesktopRoute = ({
  routesArr,
  location,
  // routes,
}) => {
  // if (!Utils.getCollaboratorId())
  //     return (<InvalidPathPage/>)
  return (
    <Switch location={location}>
      {routesArr.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact ?? true}
            render={(props) => {
              const PageComponent = route.component;
              return (
                <div className="master-layout-desktop">
                  <PageComponent
                    title={route.title}
                    {...props}
                    auth={route.auth}
                  />
                </div>
              );
            }}
          />
        );
      })}
    </Switch>
  );
};

const SwitchMobileRoute = ({ routesArr, location, setShowModal, dispatch }) => (
  <Switch location={location}>
    {routesArr.map((route) => {
      let checkRoutePath = Utils.getCurrentPathName() || "/";
      // if (checkRoutePath && checkRoutePath.startsWith(':collaboratorId/'))
      //     checkRoutePath = checkRoutePath.split(':collaboratorId/')[1]

      // if (!Utils.getCollaboratorId())
      //     return (<MobileInvalidPathPage/>)
      return (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact ?? true}
          auth={route.auth}
          render={(props) => {
            const PageComponent =
              routesArr.find((e) => {
                let checkPath = e.path;
                if (checkPath && checkPath.startsWith(":collaboratorId/"))
                  // checkPath = checkPath.split(':collaboratorId/')[1]?.split('/')[0]
                  checkPath = Utils.removeCollaboratorIdFromPath(checkPath);
                if (
                  checkPath === checkRoutePath ||
                  checkPath?.startsWith(checkRoutePath + "/")
                )
                  return e;
              }).component || MobileInvalidPathPage;
            return (
              <div className="master-layout-mobile">
                <PageComponent
                  {...props}
                  title={route.title}
                  setShowModal={setShowModal}
                  dispatch={dispatch}
                  auth={route.auth}
                />
              </div>
            );
          }}
        />
      );
    })}
  </Switch>
);

export default TransitionRoute;
