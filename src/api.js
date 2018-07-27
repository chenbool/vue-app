// const proxy = 'https://bird.ioliu.cn/v1/?url='
const proxy = 'http://192.168.1.165:3000/api/'

export default {
  'login': proxy + 'login/index',
  'quit': proxy + 'login/quit',
  'islogin': proxy + 'login/islogin',
  'getinfo': proxy + 'admin/info',
  'good': proxy + 'good/index',
  'cate': proxy + 'good/cate',
  'getsale': proxy + 'sale/getuser',
  'getusersale': proxy + 'sale/getusersale',
  'getplatform': proxy + 'sale/getPlatform',
}

