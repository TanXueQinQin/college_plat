import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import { getToken } from '@/utils/auth'


import home from '@/views/home'
import login from '@/views/login/index'
import patentStore from '@/views/patentManage/patentStore/index'
import addPatentStore from '@/views/patentManage/patentStore/addPatentStore'
import patentStoreView from '@/views/patentManage/patentStore/patentStoreView'
import petentForword from '@/views/patentManage/petentForword/index'
import patentForwordView from '@/views/patentManage/petentForword/patentForwordView'
import demandManage from '@/views/patentManage/demandManage/index'
import demandManageView from '@/views/patentManage/demandManage/demandManageView'
import makeRecord from '@/views/patentManage/makeRecord/index'
import addMakeRecord from '@/views/patentManage/makeRecord/addMakeRecord'
import makeRecordView from '@/views/patentManage/makeRecord/makeRecordView'
import organizationList from '@/views/serviceOrgan/organizationList/index'
import addOrganization from '@/views/serviceOrgan/organizationList/addOrganization'
import organzationView from '@/views/serviceOrgan/organizationList/organzationView'
import infoList from '@/views/innovateCenter/infoList/index'
import addInfo from '@/views/innovateCenter/infoList/addInfo'
import companyManage from '@/views/companySchoolComm/companyManage/index'
import addCompanyInfo from '@/views/companySchoolComm/companyManage/addCompanyInfo'
import userList from '@/views/userManage/userList/index'
import userDetail from '@/views/userManage/userList/userDetail'
import aboutUs from '@/views/systemManage/aboutUs/index'
import diction from '@/views/systemManage/diction/index'
import addDiction from '@/views/systemManage/diction/addDiction'
import certAudit from '@/views/userManage/certAudit/index'
import cartAuditDetail from '@/views/userManage/certAudit/cartAuditDetail'
import systemUserList from '@/views/systemManage/systemUserList/index'
import showindex from '@/views/showindex/index'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: home,
      redirect: '/showindex',
      children: [
        {
          path: '/showindex',
          component: showindex,
        },
        {
          path: '/patentStore',
          component: patentStore,
        },
        {
          path: '/addPatentStore',
          component: addPatentStore,
        },
        {
          path: '/patentStoreView',
          component: patentStoreView
        },
        {
          path: '/petentForword',
          component: petentForword,
        },
        {
          path: '/patentForwordView',
          component: patentForwordView,
        },
        {
          path: '/demandManage',
          component: demandManage,
        },
        {
          path: '/demandManageView',
          component: demandManageView,
        },
        {
          path: '/makeRecord',
          component: makeRecord,
        },
        {
          path: '/addMakeRecord',
          component: addMakeRecord,
        },
        {
          path: '/makeRecordView',
          component: makeRecordView,
        },
        {
          path: '/organizationList',
          component: organizationList,
        },
        {
          path: '/addOrganization',
          component: addOrganization,
        },
        {
          path: '/organzationView',
          component: organzationView,
        },
        {
          path: '/infoList',
          component: infoList,
        },
        {
          path: '/addInfo',
          component: addInfo,
        },
        {
          path: '/companyManage',
          component: companyManage,
        },
        {
          path: '/addCompanyInfo',
          component: addCompanyInfo,
        },
        {
          path: '/userList',
          component: userList,
        },
        {
          path: '/userDetail',
          component: userDetail,
        },
        {
          path: '/aboutUs',
          component: aboutUs,
        },
        {
          path: '/diction',
          component: diction,
        },
        {
          path: '/addDiction',
          component: addDiction,
        },
        {
          path: '/certAudit',
          component: certAudit,
        },
        {
          path: '/cartAuditDetail',
          component: cartAuditDetail,
        },
        {
          path: '/systemUserList',
          component: systemUserList,
        },
      
      ]
    },
    {
      path: '/login',
      component: login
    }
  ]
})


// router.beforeEach((to,from,next) => {
//     // console.log(to);
//     // if (to.fullPath == '/') {
//       console.log(getToken());
//       console.log(from);
//     //   let token = getToken()
//     //   if(token){
//         next(to.fullPath)
//     //   }else{
//     //     next('/login')
//     //   }
//     // }else{
//     //   next('/login')
//     // }
//   })

router.beforeEach((to, from, next) => {
  let token = getToken()
  if (token) {
    next();
  } else {
    //如果是登录页面路径，就直接next()
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  }
});
export default router