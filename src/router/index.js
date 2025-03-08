//导入创建路由的方法
import { createRouter,createWebHashHistory } from 'vue-router'
import { apiHeader } from '../config'
export const jmupRouter=(url) =>{
    router.replace(url)
}

//路由集合处理，创建一个路由对象，并且包括子路由
const listRoutes = {
    
}

const Login = () => import('../view/Login.vue')
const Index = () => import('../APP.vue')

//定义路由映射 route是一条路由 许多放到一起就成了集合router
const routes = [
    listRoutes,
    {path:"/",component:Index},
    {path:"/login",component:Login},
    //这玩意实际上是个数组 [] ，在里面插入了很多条对象 {}
]
//创建路由实例
const router = createRouter({
    history : createWebHashHistory(),
    routes,
})
//定义一个全局路由守卫，去判断请求链接有没有token字段
/*
router.beforeEach(
    //测试 如果token字段不是mori，就直接跳转到 /
    (to,from,next) =>{
        if(to.query.token !== "mori" && to.path == "/list"){
            next("/")
            return false
        }
        next()
    }
)
*/
//配置未登录的请求地址拦截
router.beforeEach((to, from, next) => {
    // 获取目标路径和 token
    const targetPath = to.path;
    const token = window.localStorage.getItem(apiHeader.TokenName);

    // 访问登录页面
    if (targetPath === '/login') {
        if (token) {
            // 已登录，重定向到首页
            next('/');
        } else {
            // 未登录，放行
            next();
        }
    } else {
        // 访问其他页面
        if (token) {
            // 已登录，放行
            next();
        } else {
            // 未登录，重定向到登录页面
            next('/login');
        }
    }
});

router.push("/")

export default router