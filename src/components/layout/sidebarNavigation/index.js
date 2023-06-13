import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import * as cookieConstant from "../../../lib/cookie";
//Lib
import { getCookie } from "../../../lib/helper";
// routes config
import routes from "../../../routes";
//Pages
import SideBar from "./SideBar";

const SideBarNavigation = (props) => {
  const { navList, allowAccess, settings, history, projectNavList } = props;

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  return (
    <div>
      {getCookie(cookieConstant.COOKIE_SESSION_TOKEN) ? (
        <>
          <div className="left-nav-bg"></div>
          <div className="container-fluid">
            <div className="row rowcontainer">
              <SideBar
                history={history}
                navList={navList}
                projectNavList={projectNavList}
                settings={settings || ""}
                enable={allowAccess || true}
              />
              <div className={"col col-lg pr-md-0 main-wrapper"}>
                <div className="container-fluid site-maincontent">
                  <Suspense>
                    <Switch>
                      {routes.map((route, idx) => {
                        return route.component ? (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={(props) => <route.component {...props} />}
                          />
                        ) : null;
                      })}
                    </Switch>
                  </Suspense>
                </div>
                {/* /.main-content */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Suspense fallback={loading()}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => <route.component {...props} />}
                />
              ) : null;
            })}
          </Switch>
        </Suspense>
      )}
    </div>
  );
};

export default SideBarNavigation;
