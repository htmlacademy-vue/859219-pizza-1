export default [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index"),
    meta: { layout: "AppLayoutPublic" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart"),
    meta: { layout: "AppLayoutPublic" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders"),
    meta: { layout: "AppLayoutPrivate" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile"),
    meta: { layout: "AppLayoutPrivate" },
  },
];
