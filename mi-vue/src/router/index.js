import Vue from 'vue';
import VueRouter from 'vue-router';
import views from '../views';

Vue.use(VueRouter);

var router = new VueRouter({
        routes:[
                { path:"/",redirect: "/home"},
                { path:"/home",component:views. Home},
                { path:"/category",component: views.Category},
                { path:"/profile",component: views.Profile },
                { path:"/list/:cid",component:views. List },
                { path:"/detail/:id",component:views. Detail },
                { path:"/cart",component: views.Cart },
                { path:"/login",component: views.Login },
                { path:"/confirmOrder/:arr",component:views.ConfirmOrder },
                { path:"/cashier" ,component:views.Cashier},
                { path:"/myorder",component:views.Myorder }
        ]
});

export default router;