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
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "", redirect: "splashview" },
    { path: "/recoverpassword", name: "recoverpassword", component: RecoverPasswordView },
    { path: "/splashview", name: "splashview", component: SplashView },
    { path: "/login", name: "login", component: LoginView },
    { path: "/configuration", name: "configuration", component: ConfigurationView },
    { path: "/device-management", name: "devicemanagement", component: DeviceManagementView },
    { path: "/access", name: "access", component: AccessView },
    { path: "/home", name: "home", component: HomeView },
    { path: "/home/edit", name: "edithome", component: EditHomeView },
    { path: "/home/delete", name: "deletehome", component: DeleteHomeView },
    { path: "/profile/edit", name: "EditProfile", component: EditProfileView },
    { path: "/profile/change-password", name: "ChangeUserPassword", component: ChangeUserPasswordView },
    { path: "/profile", name: "Profile", component: ProfileView },
    { path: "/members", name: "Members", component: MembersView },
    { path: "/members/add", name: "AddMember", component: AddMemberView },
    { path: "/members/delete", name: "DeleteMember", component: DeleteMemberView},
    { path: "/members/edit", name: "EditMember", component: EditMemberView},
    { path: "/stadisticas", name: "stadisticas", component: StadisticView },
    { path: "/support", name: "support", component: SupportView },
    { path: "/support/questions", name: "questions", component: Questions },
    { path: "/support/contact", name: "contact", component: Contact },
    { path: "/support/livechat", name: "livechat", component: LiveChat },
    { path: "/support/tutorials", name: "tutorials", component: Tutorials },
    { path: "/support/documentation", name: "documentation", component: Documentation },
    { path: "/membership", name: "Membership", component: MembershipView },
    { path: "/register", name: "register", component: RegisterView },

    // { path: "/about", name: "about", component: AboutView },
  ]

});

export default router;