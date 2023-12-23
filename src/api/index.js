import {axiosNormal,axiosJWT} from "@/configs/axios";

const register = async (data) => {
    const res = await axiosNormal({
        url: "/user/register",
        method: "POST",
        data: {
            email: data.email,
            mobile: data.phone,
            name: data.username,
            password: data.password
        },
        
    })
    return res.data
}
const finalRegister = async (data) => {
    const res = await axiosNormal({
        url: "/user/finalRegister",
        method: "POST",
        data: { token: data },
        
    })
    return res.data
}
const forgotPassword = async (email) => {
    const res = await axiosNormal({
        url: "/user/forgotPassword",
        method: "POST",
        data: { email },
        
    })
    return res.data
}

// change password when forgot password
const changePassword = async (password,token) => {
    const res = await axiosNormal({
        url: "/user/changePassword",
        method: "POST",
        data: { password,token },
        
    })
    return res.data
}

const login = async (email,password) => {
    const res = await axiosNormal({
        url: "/user/login",
        method: "POST",
        data: { email, password },
        withCredentials: true,
        credentials: 'include',
    })
    return res.data
}

const refreshToken = async (refreshToken) => { 
    const res = await axiosNormal({
        url: "/user/refreshToken",
        method: "POST",
        data: { refreshToken },
        withCredentials: true,
        credentials: 'include',
    })
    return res.data
}

const getProducts = async () => {
    const res = await axiosNormal({
        url: "/product/",
        method: "GET",
        
    })
    return res.data
}
const getProduct = async (slug) => {
    const res = await axiosNormal({
        url: `/product/${slug}`,
        method: "GET",
        
    })
    return res.data
}
const getProductFilter = async (params) => {
    const res = await axiosNormal({
        url: `/product/productFilter`,
        method: "GET",
        params
        
    })
    return res.data
}
const getProductSearch = async (params) => {
    const res = await axiosNormal({
        url: `/product/productSearch`,
        method: "GET",
        params
        
    })
    return res.data
}


// gọi api khi user login
const getCart = async (accessToken, dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: "/user/cart",
        method: "GET",
    })
    return res.data
}

const addProductToCart = async (data,accessToken,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: "/user/addProductCart",
        method: "PUT",
        data,
    })
    return res.data
}
const getUserCurrent = async (accessToken,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: "/user/userCurrent",
        method: "GET",
    })
    return res.data
}
const deleteProductToCart = async (accessToken,cid,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/user/deleteProductCart/${cid}`,
        method: "DELETE",
    })
    return res.data
}
const getProductToCart = async (accessToken,cid,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/user/getProductToCart/${cid}`,
        method: "GET",
    })
    return res.data
}
const updateProductToCart = async (data,pid,accessToken,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/user/updateCart/${pid}`,
        method: "PUT",
        data,
    })
    return res.data
}
const createOrder = async (accessToken,data,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/order`,
        method: "POST",
        data,
    })
    return res.data
}
const updateAvatar = async (accessToken,bodyFormData,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/user/updateAvatar`,
        method: "POST",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    })
    return res.data
}
const getOrder = async (accessToken,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/order`,
        method: "GET",
    })
    return res.data
}
const getOrderUser = async (accessToken,uid,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/order/orderUser/${uid}`,
        method: "GET",
    })
    return res.data
}
const deleteOrder = async (accessToken,oid,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/order/${oid}`,
        method: "DELETE",
    })
    return res.data
}
const getCategory = async (accessToken,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/category`,
        method: "GET",
    })
    return res.data
}
const getUsers = async (accessToken,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/user`,
        method: "GET",
    })
    return res.data
}
const getUser = async (accessToken,uid,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/user/getUser/${uid}`,
        method: "GET",
    })
    return res.data
}
const deleteUser = async (accessToken,uid,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/user/${uid}`,
        method: "DELETE",
    })
    return res.data
}
const getCartUser = async (accessToken,uid,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/user/cartUser/${uid}`,
        method: "GET",
    })
    return res.data
}
const createProduct = async (accessToken,bodyFormData,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/product`,
        method: "POST",
        data: bodyFormData,
    })
    return res.data
}
const logout = async (accessToken,dispatch,navigate) => {
    const res = await axiosJWT(dispatch,navigate,accessToken)({
        url: `/user/logout`,
        method: "GET",
        withCredentials: true,
    })
    return res.data
}

export {
    register,
    finalRegister,
    forgotPassword,
    changePassword,
    login,
    refreshToken,
    getProducts,
    getProduct,
    addProductToCart,
    getUserCurrent,
    getCart,
    deleteProductToCart,
    getProductToCart,
    updateProductToCart,
    getProductFilter,
    createOrder,
    updateAvatar,
    getOrder,
    deleteOrder,
    getCategory,
    getUsers,
    getUser,
    deleteUser,
    getCartUser,
    getOrderUser,
    createProduct,
    logout,
    getProductSearch

}