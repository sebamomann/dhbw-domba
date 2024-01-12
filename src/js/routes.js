
import BusinessPage from '../pages/BusinessPage.jsx';
import CreateBusinessPage from '../pages/CreateBusinessPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import { createBusiness } from '../services/businessService.js';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/create',
    component: CreateBusinessPage,
  },
  {
    path: '/business/:id',
    component: BusinessPage,
  }
];

export default routes;
