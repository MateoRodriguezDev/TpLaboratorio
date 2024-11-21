import { login } from "./auth/AuthController";
import { createProduct, deleteProduct, editProduct, getAllProducts } from "./products/ProductsController";



export const API ={
    //Auth
    login,

    //Products
    createProduct,
    getAllProducts,
    deleteProduct,
    editProduct


} 