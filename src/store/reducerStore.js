import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getUserCurrent, login} from "@/api"

export const fetchingUser = createAsyncThunk('data/userCurrent', async (accessToken, { rejectWithValue }) => {
    
    const user = await getUserCurrent(accessToken);
    if (user?.success) {
        return user;
    } else {
        return rejectWithValue(user.message)
    }
});

const storeSlice = createSlice({
    name: 'store',
    initialState: {
        isLogin: false,
        isMobile: true,
        isLoadingUserInAdmin: false,
        userCurrent: { cart: [] },
        allUser: [],
        viewProduct: {},
        role: "User",
        accessToken: null,
        isLoadingProduct: false,
    },
    reducers: {
        setMobile: (state, action) => ({ ...state, isMobile: action.payload }),
        setIsLogin: (state, action) => ({ ...state, isLogin: action.payload }),
        setProduct: (state, action) => {
            state.viewProduct = action.payload;
        },
        
        setIsLoadingUserInAdmin: (state, action) => {
            state.isLoadingUserInAdmin = action.payload;
        },
    },
    extraReducers: (builder) => {
        
        builder.addCase(fetchingUser.pending, (state) => {
            state.isLoadingProduct = true
        });

        builder.addCase(fetchingUser.fulfilled, (state, action) => {
            if (action?.payload?.success) {
                state.isLoadingProduct = false
                state.role = action.payload.user.role;
                state.userCurrent = action.payload.user;
                state.isLogin = true;
            }
        });

        builder.addCase(fetchingUser.rejected, (state, action) => {

        });
    },
});

const { reducer, actions } = storeSlice;

export const {
    setMobile,
    setUserCurrent,
    setIsLogin,
    setProduct,
    setReloadClickCart,
    setIsAdmin,
    setAllUser,
    setIsLoadingUserInAdmin,
} = actions;
export default reducer;
