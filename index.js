import express from 'express'
import daos from "./src/daos/index.js"
const {productosDao} = await daos

import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const app = express()



// ---------------- le agrego el codifo de graphsql abajo de cada funcion -----------------


const getAllProducts = async()=>{
    const data = await productosDao.getAll()
    return data
}

// query {
//     getAllProducts {
//         id,
//         title,
//         price,
//         thumbnail
//     }
// }

const getProductById = async({id})=>{
    const data = await productosDao.getById(id)
    return data
}

// query {
//     getProductById(id: "63e3fc97b88cbfef3a43a34a") {
//         id,
//         title,
//         price,
//         thumbnail
//     }
// }

const saveProduct = async({data})=>{
    const dato = await productosDao.save(data)
    return dato
}

// mutation {
//     saveProduct (data:{
//        title:"manzana",
//        price: 21,
//        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png",
//       description:"hola"
//      }) {
//        id,
//        title,
//        price,
//        thumbnail,
//       description
//     }
//   }

const deleteProduct = async ({id})=>{
    const data = await productosDao.deleteById(id)
    return data
}
// mutation {
//     deleteProduct(id: "63e40517f64b8c8333992404")
// }


const updateProduct = async ({id,data})=>{
    const dato = await productosDao.updateById(id,data)
    return dato
}

// mutation {
//     updateProduct (
//       id: "63e40517f64b8c8333992404"
//       data:{
//         title:"pera",
//         price: 33333,
//         thumbnail: "https://img.freepik.com/foto-gratis/fruta-pera-fresca-humeda_144627-17211.jpg?w=2000",
//         description:"modificado re padre"
//       }
//        ) {
//            title,
//       price,
//       thumbnail,
//       description
//     }


const schema = buildSchema(`type Producto{
    id: String,
    title: String,
    price: Int,
    thumbnail: String,
    description: String
}
    
input ProductoInput {
    title: String!,
    price: Int!,
    thumbnail: String!,
    description: String!
    }
    
    type Query{
        getAllProducts: [Producto],
        getProductById (id: String!): Producto
    }

    type Mutation {
        saveProduct(data: ProductoInput): Producto,
        deleteProduct(id: String!): String,
        updateProduct(id:String!, data: ProductoInput): Producto
    }
    
    `)

app.use("/graphql", graphqlHTTP({
    schema,
    //* resolvers
    rootValue:{
        getAllProducts,
        getProductById,
        saveProduct,
        deleteProduct,
        updateProduct
    },
    graphiql:true

}))



app.listen(8080, ()=>{
    console.log("escuchando")
})



