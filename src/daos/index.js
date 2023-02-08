import * as dotenv from "dotenv"
dotenv.config()

const daos ={
    mongo: async()=>{
        const {default: productosDaoMongo} = await import("./productos/productos.js")
        return{
            productosDao: new productosDaoMongo()
        }
    }
}
export default daos[process.env.TIPO]()
