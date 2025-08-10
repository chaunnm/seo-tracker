import { Annotations, Dashboard, Login, Settings } from "../pages";

const publicRoute = [{ path: "/login", page: Login }];

const privateRoute = [
  { path: "/", page: Dashboard },
  { path: "/annotations", page: Annotations },
  { path: "/settings", page: Settings },
];

export { publicRoute, privateRoute };
