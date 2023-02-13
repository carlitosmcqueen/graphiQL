import Router from "koa-router"
import daos from "../daos/index.js"
const {productosDao} = await daos


const router = new Router({
    prefix:"/productos"
})

router.get("/", async(ctx)=>{
    const datos = await productosDao.getAll()
    ctx.body= datos
})

router.get("/:id", async (ctx)=>{
    const id = ctx.params.id
    const dato = await productosDao.getById(id)
    ctx.body = dato
})
router.post("/", async (ctx)=>{
    const producto = ctx.request.body
    ctx.body= await productosDao.save(producto)
})

router.delete("/", async (ctx)=>{
    const id = ctx.params.id
    const dato = await productosDao.deleteById(id)
    ctx.body = dato
})
router.put("/:id", async (ctx)=>{
    const id = ctx.params.id
    const {title,price,thumbnail,description} = ctx.request.body
    const productoMod = {title,price,thumbnail,description}
    const productoActualizado = {id,...productoMod}
    await productosDao.updateById(id, productoActualizado)
    ctx.body = `el producto ${id} fue actualizado`
})

export default router