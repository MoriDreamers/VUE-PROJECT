//导入创建路由的方法
import { createRouter,createWebHashHistory } from 'vue-router'

//路由集合处理，创建一个路由对象，并且包括子路由
const listRoutes = {
    
}
const Login = () => import('../view/Login.vue')

//定义路由映射 route是一条路由 许多放到一起就成了集合router
const routes = [
    listRoutes,
    
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
router.push("/")

export default router