import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

import Home from "@/components/Home.vue";
import Question from "@/components/Question.vue";
import Game from "@/components/Game.vue";
import Login from "@/components/Login.vue";

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: "/",
			component: Home,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/question",
			component: Question,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/game",
			component: Game,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/login",
			component: Login,
		},
	],
});

router.beforeEach((to, from, next) => {
	let currentUser = firebase.auth().currentUser;

	if (to.meta.requiresAuth && currentUser == null) {
		next("/login");
	} else {
		next();
	}
});

export default router;
