import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import ProfileView from "../views/ProfileView.vue";
import SalesView from "../views/SalesView.vue";
import SalesPageView from "../views/SalesPageView.vue";
import UsersListView from "../views/UsersListView.vue";
import UserPageView from "../views/UserPageView.vue";
import { auth } from "../firebase";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: { name: "home" }
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { background: true },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { background: true },
  },
  {
    path: "/sales",
    name: "sales",
    component: SalesView,
    meta: { background: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: { background: true },
  },
  {
    path: "/sale/:hash",
    name: "salesPage",
    component: SalesPageView,
    meta: { background: true },
  },
  {
    path: "/users",
    name: "users",
    component: UsersListView,
    meta: { background: true },
  },
  {
    path: "/user/:uid",
    name: "userPage",
    component: UserPageView,
    meta: { background: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = auth.currentUser;

    if (!user) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
