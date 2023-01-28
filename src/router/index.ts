import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    name: 'home',
    path: '/home',
    component: () => import('../view/home.vue'),
    children: [
      // {
      //   name: 'home',
      //   path: '/home',
      //   component: () => import('../view/Home.vue'),
      // },
    ],
  },
  {
    name: 'root',
    path: '/',
    redirect: '/home',
  },
];

const router = createRouter({ history: createWebHashHistory(), routes });
export default router;
