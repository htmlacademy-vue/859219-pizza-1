export default [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index"),
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
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile"),
  },
];