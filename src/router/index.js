import Vue from "vue";
import VueRouter from "vue-router";
const StartPage = () =>  Promise.resolve(import("../views/StartPage.vue"));
const GamePage = () =>  Promise.resolve(import("../views/GamePage.vue"));
const ChoosePlayerPage = () =>  Promise.resolve(import("../views/ChoosePlayerPage.vue"));
const EndPage = () =>  Promise.resolve(import("../views/EndPage.vue"));

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/start"
    },
    {
        path: "/start",
        name: "start",
        component: StartPage
    },
    {
        path: "/game",
        name: "game",
        component: GamePage
    },
    {
        path: "/choose-player",
        name: "choosePlayer",
        component: ChoosePlayerPage
    },
    {
        path: "/end",
        name: "end",
        component: EndPage
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

export default router;
