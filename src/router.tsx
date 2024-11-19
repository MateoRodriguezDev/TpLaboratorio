import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./routes/Root";
import ProductsView from "./routes/products/ProductsView";
import CreateProductView from "./routes/products/CreateProductView";
import DeletedProductsView from "./routes/products/DeletedProductsView";
import UsersView from "./routes/users/UsersView";
import CreateUserView from "./routes/users/CreateUserView";
import DeletedUsersView from "./routes/users/DeletedUsersView";
import Login from "./routes/Login";

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route element={<Root />}>
                <Route path="/home" element={<ProductsView/>}/>
                <Route path="/createProduct" element={<CreateProductView/>}/>
                <Route path="/deletedProducts" element={<DeletedProductsView/>}/>

                <Route path="/users" element={<UsersView/>}/>
                <Route path="/createUser" element={<CreateUserView/>}/>
                <Route path="/deletedUsers" element={<DeletedUsersView/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
