export default [
  {
    path: '',
    component: () => import("@/views/Layout/index.vue"),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: '/settings',
        name: 'Pengaturan',
        component: () => import('@/views/Settings.vue')
      },

      {
        path: '/dataAdministrator',
        name: 'DataAdministrator',
        component: () => import('@/views/page-content/Administrator/V_Administrator.vue')
      },
      {
        path: '/formulirAdministrator/:kondisi/:uid',
        name: 'FormulirAdministrator',
        props: true,
        component: () => import('@/views/page-content/Administrator/P_FormAdministrator.vue')
      },

      {
        path: '/dataBiodata',
        name: 'DataBiodata',
        component: () => import('@/views/page-content/Biodata/V_Biodata.vue')
      },
      {
        path: '/formulirBiodata/:kondisi/:uid',
        name: 'FormulirBiodata',
        props: true,
        component: () => import('@/views/page-content/Biodata/P_FormBiodata.vue')
      },
    ]
  },
  {
    path: '/undercontruction',
    name: 'UnderContruction',
    prop: true,
    component: () => import('@/views/UnderContruction.vue')
  },
]