import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity ;
        },
        updateProduct: (state, action) => {
            let updatedProduct = state.products.map(product=>product._id).indexOf(action.payload._id);
            state.total = (state.total - action.payload.oldQuantity*action.payload.price) + 
                action.payload.price * action.payload.quantity ;
            state.products[updatedProduct].quantity = action.payload.quantity;
        },
        removeProduct: (state, action) => {
            const index = state.products.findIndex(
              (product) => product.id === action.payload.id
            );
            let newCart = [...state.products];
            if (index >= 0) {
              newCart.splice(index, 1);
            }
            state.products = newCart;
            state.quantity -= 1;
            state.total -= action.payload.price;
          },
        emptyCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    }
});

export const { addProduct, updateProduct, removeProduct, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;