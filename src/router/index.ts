import { createRouter, createWebHistory } from "vue-router";
import StadisticView from "../views/StadisticView.vue";
import HomeView from "../views/HomeView.vue";
import SplashView from "../components/shared/SplashView.vue";
import LoginView from "../views/LoginView.vue";
import ConfigurationView from "../views/ConfigurationView.vue";
import ProfileView from "../views/ProfileView.vue";
import MembersView from "../views/MembersView.vue";
import MembershipView from "../views/MembershipView.vue";
import RecoverPasswordView from "../views/RecoverPasswordView.vue";
import RegisterView from "../views/RegisterView.vue";
import AddMemberView from "../views/AddMemberView.vue";
import DeleteMemberView from "../views/DeleteMemberView.vue";
import DeviceManagementView from "../views/DeviceManagementView.vue";
import AccessView from "../views/AccessView.vue";
import SupportView from "../views/SupportView.vue";
import Questions from "../support/Questions.vue";
import Contact from "../support/Contact.vue";
import Tutorials from "../support/Tutorials.vue";
import Documentation from "../support/Documentation.vue";
import LiveChat from "../support/LiveChat.vue";
import EditHomeView from "../views/EditHomeView.vue";
import DeleteHomeView from "../views/DeleteHomeView.vue";
import EditMemberView from "../views/EditMemberView.vue";
import EditProfileView from "../views/EditProfileView.vue";
import ChangeUserPasswordView from "../views/ChangeUserPasswordView.vue";
import PublicDataByMemberId from "../views/PublicDataByMemberId.vue";

const routes = [
  { path: "", redirect: "splashview" },
  { path: "/recoverpassword", name: "recoverpassword", component: RecoverPasswordView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/splashview", name: "splashview", component: SplashView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/configuration", name: "configuration", component: ConfigurationView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/device-management", name: "devicemanagement", component: DeviceManagementView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/access", name: "access", component: AccessView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/home", name: "home", component: HomeView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/home/edit", name: "edithome", component: EditHomeView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/home/delete", name: "deletehome", component: DeleteHomeView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/profile/edit", name: "EditProfile", component: EditProfileView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/profile/change-password", name: "ChangeUserPassword", component: ChangeUserPasswordView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/profile", name: "Profile", component: ProfileView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/members", name: "Members", component: MembersView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/members/add", name: "AddMember", component: AddMemberView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/members/delete", name: "DeleteMember", component: DeleteMemberView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/members/edit", name: "EditMember", component: EditMemberView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/stadisticas", name: "stadisticas", component: StadisticView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/support", name: "support", component: SupportView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/support/questions", name: "questions", component: Questions, meta: { requiresAuth: true } }, // autentica esto
  { path: "/support/contact", name: "contact", component: Contact, meta: { requiresAuth: true } }, // autentica esto
  { path: "/support/livechat", name: "livechat", component: LiveChat, meta: { requiresAuth: true } }, // autentica esto
  { path: "/support/tutorials", name: "tutorials", component: Tutorials, meta: { requiresAuth: true } }, // autentica esto
  { path: "/support/documentation", name: "documentation", component: Documentation, meta: { requiresAuth: true } }, // autentica esto
  { path: "/membership", name: "Membership", component: MembershipView, meta: { requiresAuth: true } }, // autentica esto
  { path: "/register", name: "register", component: RegisterView },
  { path: "/public/:id", name: "PublicDataByMemberId", component: PublicDataByMemberId },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Guardia global
router.beforeEach((to, _from, next) => {
  const isLoggedIn = !!localStorage.getItem("nickname");

  // Si la ruta requiere auth y no está logueado -> login
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: "login" });
  }

  // Si está logueado y va a login -> home
  if (to.name === "login" && isLoggedIn) {
    return next({ name: "home" });
  }

  next();
});

export default router;
