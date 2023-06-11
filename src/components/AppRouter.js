import { Routes, Route } from "react-router-dom";
import React from "react";
import { privateRoutes, publicRoutes } from "../router";
import { useSelector } from "react-redux";

const AppRouter = () => {
  const { isAuth } = useSelector((state) => state.authReducer);
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          element={<route.component />}
          key={route.path}
        />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          element={<route.component />}
          key={route.path}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
