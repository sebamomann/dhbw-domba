
import BusinessPage from '../pages/BusinessPage.jsx';
import CreateBusinessPage from '../pages/CreateBusinessPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/profile',
    component: ProfilePage,
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
