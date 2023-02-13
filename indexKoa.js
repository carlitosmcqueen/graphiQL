import Koa from "koa"
import {koaBody} from "koa-body"
import router from "./src/routes/rutaKoaProductos.js"

const app = new Koa()

app.use(router.allowedMethods())

app.use(koaBody())
app.use(router.routes())

app.listen(8082,()=>{
    console.log("conectado")
})