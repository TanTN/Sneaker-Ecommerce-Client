import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getUserCurrent} from "@/api"

export const fetchingUser = createAsyncThunk('data/userCurrent', async (accessToken, { rejectWithValue }) => {
    
    const res = await getUserCurrent(accessToken);
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
    },
    reducers: {
        setMobile: (state, action) => ({ ...state, isMobile: action.payload }),
        setLogoutUser: (state, action) => {
            state.userCurrent = { cart: [] };
            state.isAdmin = false;
            state.isLogin = false;
            state.accessToken = null;
        },

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
    setLogoutUser
} = actions;
export default reducer;
