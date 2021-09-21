console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_BASE_API);
module.exports = {
  title: '高校后台',
  name: '高校后台',
  code: '10002',
   
  apiModule: {
    /**
     * 授权登录模块
     */
    auth: 'https://college.lioverseas.com',
  

  },
  /**
   * 本地储存信息
   */
  localStorageConfig: {
    /**
     * tokenKey
     */
    tokenKey: '',
    /**
      * userInfoKey
      */
    infoKey:''
  },
  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true
}
