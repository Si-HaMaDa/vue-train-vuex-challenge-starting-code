import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

import ProductsList from './pages/ProductsList.vue';
import UserCart from './pages/UserCart.vue';
import ShopAdmin from './pages/ShopAdmin.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/products' },
        { path: '/products', component: ProductsList },
        { path: '/cart', component: UserCart },
        {
            path: '/admin',
            component: ShopAdmin,
            meta: { needsAuth: true },
            beforeEnter(to, from, next) {
                if (to.meta.needsAuth && !store.getters.isLogged) {
                    console.log('Needs auth!');
                    next('/');
                } else {
                    next();
                }
            },
        },
    ],
});

export default router;
