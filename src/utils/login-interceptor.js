import { loginByUsername } from '@/api/user'
// import { setToken, setUserInfo, removeToken } from '@/utils/auth'
// import { code } from '@/settings'
// import { Message } from 'element-ui'
// import Vue from '@/main'

/**
 * 登录拦截器,通过此方法进行对当前账号角色进行处理,多角色弹出选择角色弹窗,单角色直接进入系统
 * @param  storeCommit { object } vuex中的state.commit
 * @param  userInfo { object } 用户信息
 */
export function loginInterceptor(storeCommit, userInfo) {

  const { username, password } = this.$store.state.userInfo
  return new Promise((resolve, reject) => {
    loginByUsername({ username: username, password: password, ...userInfo }).then(({ data: response }) => {
   
        this.$store.commit('setToken',response.accessToken)
        this.$store.commit('setUserInfo',response)

        // storeCommit('SET_TOKEN', response.accessToken)
        // storeCommit('SET_USET_INFO', response)
        // setToken(response.accessToken)
        // setUserInfo(response)
        // sessionStorage.setItem('userInfo', JSON.stringify(response))
        resolve()
      
    }).catch(error => {
      reject(error)
    })
  })
}
