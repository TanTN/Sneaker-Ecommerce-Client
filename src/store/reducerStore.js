import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getUserCurrent} from "@/api"

export const fetchingUser = createAsyncThunk('data/userCurrent', async ({accessToken,dispatch,navigate},{ rejectWithValue }) => {
    
    const res = await getUserCurrent(accessToken, dispatch, navigate);
    if (res?.success) {
        return res;
    } else {
        return rejectWithValue(res.message)
    }
});

const storeSlice = createSlice({
    name: 'store',
    initialState: {
        isLogin: false,
        isMobile: true,
        userCurrent: { cart: [] },
        accessToken: null,
        isAdmin: false,
        doSearch: 0,
        idProductOnCart: 0,
    },
    reducers: {
        setMobile: (state, action) => ({ ...state, isMobile: action.payload }),
        setDoSearch: (state, action) => ({ ...state, doSearch: Math.random() }),
        setLogoutUser: (state, action) => {
            state.userCurrent = { cart: [] };
            state.isAdmin = false;
            state.isLogin = false;
            state.accessToken = null;
        },
        addProductToCartNoLogin: (state, action) => {
            state.userCurrent.cart.push(action.payload);
        },
        setIdProductToCart: (state, action) => {
            state.idProductOnCart = action.payload;
        },
        updateProductToCartNoLogin: (state, action) => {
            const _id = state.userCurrent.cart[action.payload.indexProduct]._id
            state.userCurrent.cart[action.payload.indexProduct] = {_id,...action.payload.product}
        },
        deleteProductToCartNoLogin: (state, action) => { 
            const cart = state.userCurrent.cart.filter(elm => elm._id !== action.payload)
            state.userCurrent.cart = cart
        },
        orderNoLogin: (state, action) => { 
            state.userCurrent.cart = []
        },
        resetAccessToken: (state, action) => { 
            state.userCurrent.accessToken = action.payload
        }
    },
    extraReducers: (builder) => {
        
        builder.addCase(fetchingUser.pending, (state) => {

        });

        builder.addCase(fetchingUser.fulfilled, (state, action) => {
            if (action?.payload?.success) {
                state.userCurrent = action.payload.user;
                state.isLogin = true;
                if (action.payload.user.role === 'Admin') { 
                    state.isAdmin = true;
                }
            }
        });

        builder.addCase(fetchingUser.rejected, (state, action) => {

        });
    },
});

const { reducer, actions } = storeSlice;

export const {
    setMobile,
    setLogoutUser,
    setDoSearch,
    addProductToCartNoLogin,
    setIdProductToCart,
    updateProductToCartNoLogin,
    deleteProductToCartNoLogin,
    orderNoLogin,
    setReLoginAccount,
    resetAccessToken
} = actions;
export default reducer;
