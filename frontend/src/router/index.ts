import { createRouter, createWebHistory } from 'vue-router'

import Management from '../pages/Management.vue'
import StudentList from '../pages/student/StudentList.vue'
import StudentInfo from '../pages/student/StudentInfo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
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

export default router
