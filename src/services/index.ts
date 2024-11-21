import { login } from "./auth/AuthController";
import { createProduct, deleteProduct, editProduct, getAllProducts } from "./products/ProductsController";
import { changeRole, createUser, deleteUser, editUser, getAllUsers } from "./users/UserController";



export const API ={
    //Auth
    login,

    //Products
    createProduct,
    getAllProducts,
    deleteProduct,
    editProduct,

    //Users
    createUser,
    getAllUsers,
    deleteUser,
    editUser,
    changeRole,


} 