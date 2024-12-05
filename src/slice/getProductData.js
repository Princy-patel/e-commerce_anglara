import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (thunkAPI) => {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
  }
);

const initialState = {
  cartData: [],
  data: [],
  value: 0,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload.id;
      const existingItem = state.cartData.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartData.push({ ...action.payload, quantity: 1 });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { addToCart } = productSlice.actions;

export default productSlice.reducer;