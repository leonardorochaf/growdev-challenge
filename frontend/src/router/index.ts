import { createRouter, createWebHistory } from 'vue-router'

import Management from '../pages/Management.vue'
import StudentList from '../pages/student/StudentList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/management',
      name: 'Management',
      component: Management,
      redirect: "/management/students",
      children: [
        {
          path: 'students',
          name: 'Students',
          component: StudentList,
        },
      ],
      meta: {
        title: 'Management',
      }
    }
  ]
})

export default router
