import { create } from "zustand";
import { API } from "../services";
import { Product } from "../models/ProductModel";

type ProductStore = {
  allProducts: Product[];
  isEditing: boolean;
  editingProduct: Product;

  createProduct: (product: Product) => Promise<void>;
  getAllProducts: () => Promise<void>;
  editProduct: (id: number, product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  reset: () => void
};

export const useProductStore = create<ProductStore>((set, get) => ({
  allProducts: [] as Product[],
  isEditing: false,
  editingProduct: {} as Product,

  // Creo un producto
  createProduct: async (product: Product) => {
    try {
      const response = await API.createProduct(product);

      // Devuelve solo el producto si la respuesta es válida y lo guardo en el store
      if (response) {
        set((state) => ({
          allProducts: [...state.allProducts, response],
        }));
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  },

  // Guardo todos los productos
  getAllProducts: async () => {
    try {
      const response = await API.getAllProducts();

      // Devuelve solo los productos si la respuesta es válida y lo guardo en el store
      if (response) {
        set({ allProducts: response });
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  },

  // Edita un producto
  editProduct: async (id: number, updatedProduct: Product) => {
    try {
      const response = await API.editProduct(id, updatedProduct);

      // Reinicio las variables de edición
        get().isEditing = false
        get().editingProduct = {} as Product

    } catch (error) {
      console.error("Error creating product:", error);
    }
  },

  // Borra un producto
  deleteProduct: async (id: number) => {
    try {
      const response = await API.deleteProduct(id);
      // Filtra los productos
      if (response) {
        const currentAllProducts = get().allProducts;
        const newAllProducts = currentAllProducts.filter(
          (product) => product.id !== id
        );
        set({ allProducts: newAllProducts });
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  },
  reset: () => set({ allProducts: [], isEditing: false, editingProduct: {} as Product }), // Reinicia el estado a su valor inicial
}));
