import { createRouter, createWebHistory } from 'vue-router'

import Management from '../pages/Management.vue'
import StudentList from '../pages/student/StudentList.vue'
import StudentInfo from '../pages/student/StudentInfo.vue'
import Login from '../pages/Login.vue'
import { removeFromLocalStorage } from '../services/local-storage.service'

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

    return next();

  } catch (err) {
    removeFromLocalStorage('token');
    return next({ name: 'Login' });
  }
})

export default router
