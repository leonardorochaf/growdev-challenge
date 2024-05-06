import { createRouter, createWebHistory } from 'vue-router'

import Management from '../pages/Management.vue'
import StudentList from '../pages/student/StudentList.vue'
import StudentInfo from '../pages/student/StudentInfo.vue'
import Login from '../pages/Login.vue'
import { getFromLocalStorage, removeFromLocalStorage } from '../services/local-storage.service'
import { validateToken } from '../services/auth.service'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/management',
      name: 'Management',
      component: Management,
      redirect: "/management/students",
      meta: {
        title: 'Management',
      },
      children: [
        {
          path: 'students',
          children: [
            {
              path: "",
              name: "Students",
              component: StudentList,
            },
            {
              path: "create",
              name: "StudentInfoCreate",
              component: StudentInfo,
            },
            {
              path: ":id",
              name: "StudentInfoUpdate",
              component: StudentInfo,
              props: true,
            },
          ]
        },
      ],
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    if (to.name === 'Login') {
      removeFromLocalStorage('token');
      return next();
    }

    if (!getFromLocalStorage('token')) {
      return next({ name: 'Login', replace: true });
    }

    const validToken = await validateToken(getFromLocalStorage('token'));
    if (!validToken) {
      removeFromLocalStorage('token');
      return next({ name: 'Login', replace: true });
    }

    return next();

  } catch (err) {
    removeFromLocalStorage('token');
    return next({ name: 'Login' });
  }
})

export default router
