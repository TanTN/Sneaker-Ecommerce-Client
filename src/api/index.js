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
        
    })
    return res.data
}
const refreshToken = async () => { 
    const res = await axiosNormal({
        url: "/user/refreshToken",
        method: "POST",
        withCredentials: true,
        
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
const getProductFilter = async (data) => {
    const res = await axiosNormal({
        url: `/product/productFilter`,
        method: "GET",
        data
        
    })
    return res.data
}

// gọi api khi user login
const getUser = async (accessToken) => {
    const res = await axiosJWT({
        url: "/user/userCurrent",
        method: "GET",
        headers:{Authorization: "Bearer " + accessToken}
    })
    return res.data
}
const getCart = async (accessToken) => {
    const res = await axiosJWT({
        url: "/user/cart",
        method: "GET",
        headers:{Authorization: "Bearer " + accessToken}
    })
    return res.data
}
const addProductToCart = async (data,accessToken) => {
    const res = await axiosJWT({
        url: "/user/addProductCart",
        method: "PUT",
        data,
        headers:{Authorization: "Bearer " + accessToken}
    })
    return res.data
}
const getUserCurrent = async (accessToken) => {
    const res = await axiosJWT({
        url: "/user/userCurrent",
        method: "GET",
        headers:{Authorization: "Bearer " + accessToken}
    })
    return res.data
}
const deleteProductToCart = async (accessToken,cid) => {
    const res = await axiosJWT({
        url: `/user/deleteProductCart/${cid}`,
        method: "DELETE",
        headers: { Authorization: "Bearer " + accessToken }
    })
    return res.data
}
const getProductToCart = async (accessToken,slug) => {
    const res = await axiosJWT({
        url: `/user/getProductToCart/${slug}`,
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken }
    })
    return res.data
}
const updateProductToCart = async (data,pid,accessToken) => {
    const res = await axiosJWT({
        url: `/user/updateCart/${pid}`,
        method: "PUT",
        data,
        headers: { Authorization: "Bearer " + accessToken }
    })
    return res.data
}
const createOrder = async (accessToken,data) => {
    const res = await axiosJWT({
        url: `/order`,
        method: "POST",
        data,
        headers: { Authorization: "Bearer " + accessToken }
    })
    return res.data
}
const updateAvatar = async (accessToken,bodyFormData) => {
    const res = await axiosJWT({
        url: `/user/updateAvatar`,
        method: "POST",
        data: bodyFormData,
        headers: { Authorization: "Bearer " + accessToken, "Content-Type": "multipart/form-data" },
    })
    return res.data
}
const getOrder = async (accessToken) => {
    const res = await axiosJWT({
        url: `/order`,
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken},
    })
    return res.data
}
const deleteOrder = async (accessToken,oid) => {
    const res = await axiosJWT({
        url: `/order/${oid}`,
        method: "DELETE",
        headers: { Authorization: "Bearer " + accessToken},
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
    getUser,
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
    deleteOrder
}