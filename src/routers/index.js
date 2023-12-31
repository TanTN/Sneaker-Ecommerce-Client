import { lazy } from 'react';

import NotFound from '../pages/notfound';
import LayoutAdmin from '../layout/layoutAdmin';
import Buy from "../pages/order"

import ForgotPassword from '@/pages/forgotPassword';
const CategoryInAdmin = lazy(() => import('../pages/categoryInAdmin'));
const CreateProductInAdmin = lazy(() => import('../pages/createProduct'));
const UserInAdmin = lazy(() => import('../pages/userInAdmin'));
const Home = lazy(() => import('../pages/home'));
const DetailProduct = lazy(() => import('../pages/detailProduct'));
// const Buy = lazy(() => import('../pages/buy'));
const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));
const Cart = lazy(() => import('../pages/cart'));
const User = lazy(() => import('../pages/user'));
const Search = lazy(() => import('../pages/search'));

const routes = {
    detailProductUser: '/detailProduct/:productInCart/:id',
    login: '/login',
    register: '/register',
    cart: '/cart',
    user: '/user',
    buy: '/buy',
    home: '/',
    search: '/search/:param',
    createProductInAdmin: '/admin/createProduct',
    categoryInAdmin: '/admin/category/:nameCategory',
    userInAdmin: '/admin/user/:userId',
    forgotPassword: '/forgotPassword/:token',
    detailProductInCart: '/cart/:slug',
    detailProduct: '/:slug',
    notFound: '*',
};

const pluginRouters = [
    { path: routes.detailProduct, component: DetailProduct },
    { path: routes.detailProductUser, component: DetailProduct },
    { path: routes.detailProductInCart, component: DetailProduct },
    { path: routes.login, component: Login, layout: null },
    { path: routes.register, component: Register, layout: null },
    { path: routes.search, component: Search},
    { path: routes.forgotPassword, component: ForgotPassword, layout: null },
    { path: routes.user, component: User },
    { path: routes.cart, component: Cart },
    { path: routes.home, component: Home },
    { path: routes.buy, component: Buy },
    { path: routes.createProductInAdmin, component: CreateProductInAdmin, layout: LayoutAdmin },
    { path: routes.userInAdmin, component: UserInAdmin, layout: LayoutAdmin },
    { path: routes.categoryInAdmin, component: CategoryInAdmin, layout: LayoutAdmin },
    { path: routes.notFound, component: NotFound, layout: null },
];

export default pluginRouters;
