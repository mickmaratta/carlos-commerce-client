import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: [],
        wishlistQuantity: 0,
    },
    reducers: {
        addFavorite: (state, action) => {
            state.wishlistQuantity += 1;
            state.products.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.wishlistQuantity -= 1;
            state.products = state.products.filter(product=>product._id !== action.payload);
        }
    }
});

export const { addFavorite, removeFavorite } = wishlistSlice.actions;
export default wishlistSlice.reducer;