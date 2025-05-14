import { createRouter, createWebHistory } from "vue-router";
import StadisticView from "../views/StadisticView.vue";
import HomeView from "../views/HomeView.vue";
// import AboutView from "../components/shared/AboutView.vue";
import SplashView from "../components/shared/SplashView.vue";
import LoginView from "../views/LoginView.vue";
import ConfigurationView from "../views/ConfigurationView.vue";
import ProfileView from "../views/ProfileView.vue";
import MembersView from "../views/MembersView.vue";
import MembershipView from "../views/MembershipView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "", redirect: "splashview" },
    { path: "/splashview", name: "splashview", component: SplashView },
    { path: "/login", name: "login", component: LoginView },
    { path: "/configuration", name: "configuration", component: ConfigurationView },
    { path: "/home", name: "home", component: HomeView },
    { path: "/profile", name: "Profile", component: ProfileView },
    { path: "/members", name: "Members", component: MembersView },
    { path: "/stadisticas", name: "stadisticas", component: StadisticView },
    { path: "/membership", name: "Membership", component: MembershipView },

    // { path: "/about", name: "about", component: AboutView },
  ]

});

export default router;