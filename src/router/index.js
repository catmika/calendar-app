import Event from "../pages/Event";
import Login from "../pages/Login";

export const RouteNames = {
  LOGIN: "/login",
  EVENT: "/event",
};

export const publicRoutes = [
  {
    path: RouteNames.LOGIN,
    exact: true,
    component: Login,
  },
  {
    path: "*",
    exact: false,
    component: Login,
  },
];
export const privateRoutes = [
  {
    path: RouteNames.EVENT,
    exact: true,
    component: Event,
  },
  {
    path: "*",
    exact: false,
    component: Event,
  },
];
