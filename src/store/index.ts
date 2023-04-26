import { createStore } from 'vuex'

const LoginStatus = createStore({
  state:{
    auth: {
      loggedIn: localStorage.getItem('token') && localStorage.getItem('userId') ? true : false
    },
    userInfo:{
      userId: localStorage.getItem('userId') ? localStorage.getItem('userId') :'',
      tel:localStorage.getItem('tel') ? localStorage.getItem('tel') :'',
      token: localStorage.getItem('token') ? localStorage.getItem('token') :'',
      name: localStorage.getItem('name') ? localStorage.getItem('name') :'',
    }
  },
  mutations: {
    setLoggedIn(state, loggedIn) {
      state.auth.loggedIn = loggedIn
    },
    setUserInfo(state, userInfo){
      state.userInfo.userId = userInfo.userId;
      state.userInfo.tel = userInfo.tel;
      state.userInfo.token = userInfo.token;
      state.userInfo.name = userInfo.name;
    }
  }
})




export default LoginStatus