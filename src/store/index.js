import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      userinfo:{
          username:'',
          password:''
      },
      token:''
    },
    mutations: {
      setToken(state,token){
        state.token = token
      },
      setUserInfo(state,userInfo){
        state.userinfo= userInfo
      }
    }
  })

  export default store