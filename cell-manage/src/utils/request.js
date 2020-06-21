/**
 * 封装axios的请求
 */
// 引入axios和qs
import axios from "axios"
import qs from "qs"
// 引入本地存储
import Local from "@/utils/local"

// 引入element-ui
import { Message} from "element-ui"
import router from "@/router/index"


//设置请求的服务器地址,""里面不能有空格
// axios.defaults.baseURL="http://127.0.0.1:5000";
axios.defaults.baseURL="http://192.168.1.3:5000";
Local.set('host',axios.defaults.baseURL)
// 设置请求的时间
axios.defaults.timeout=5000;

// 请求拦截
axios.interceptors.request.use((config) => {
//   在请求之前把token给带上
    // 从本地存储里面取出数据
    let token=Local.get('token');
    // console.log(token)
    if(token){
        config.headers.Authorization=token
    }

    return config;
  });
  
// 响应拦截

axios.interceptors.response.use(
    (response) => {
    // console.log("响应拦截器", response);
    // 对后台响应的数据进行处理
//   判断响应的数据里面有没有code,如果有而且不为undefined
    if(response.data.code!=undefined && response.data.msg!=undefined){
        let {code,msg}=response.data;
        if(code===0){
            //  弹出提示框
            Message({
                message: msg,
                type: 'success'
            })
        }else if(code===1){//不能直接else,有其他情况要考虑进来
            // 弹出错误
            Message.error(msg); 
        }

    }
    return response;
  },
  (err) => {
    if(err.response.data.code !== undefined && err.response.data.msg !== undefined) {
      let { code, msg } = err.response.data;
      if (code === 401) {
        Message.error(msg); // 弹出错误提示
        local.clear(); // 清空本地
        router.push("/login"); // 跳转到登录
      }
    }
  }
);
  
// 对post和get进行封装
export default {
    // get的封装
    get(url,data={}){
        return new Promise((resolve,reject)=>{
            axios.get(url,{params:data})
                .then(response=>{
                    resolve (response.data);
                })
                .catch(err=>{
                    reject(err);
                })
        })
    },
   
    // post的封装
    post(url,data = {} ){
        return new Promise((resolve,reject)=>{
            axios.post(url,qs.stringify(data))
                .then(response=>{
                    resolve(response.data)
                })
                .catch(err=>{
                    reject(err);
                })
        })
    }
}