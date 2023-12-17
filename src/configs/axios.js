import { refreshToken } from "@/api";
import axios from "axios"
import { jwtDecode } from "jwt-decode";

const axiosNormal = axios.create({
    baseURL: import.meta.env.VITE_BASE_AXIOS || "https://sneaker-ecommerce-server.vercel.app/api/v1"
})

const axiosJWT = axios.create({
    baseURL: import.meta.env.VITE_BASE_AXIOS || "https://sneaker-ecommerce-server.vercel.app/api/v1"
})

// Thêm một bộ đón chặn request
axiosNormal.interceptors.request.use(function (config) {
    // Làm gì đó trước khi request dược gửi đi
    return config;
  }, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  });

// Thêm một bộ đón chặn response
axiosJWT.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  }, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
});

// axios check json web token
// Thêm một bộ đón chặn request
axiosJWT.interceptors.request.use(async function (config) {
  // Làm gì đó trước khi request dược gửi đi

  // xử lý access token khi hết hạn
  const {store} = await JSON.parse(window.localStorage.getItem("persist:root"))
  const user = JSON.parse(store).userCurrent
  if (user?.accessToken) {
    const date = new Date()
    const decodedToken = await jwtDecode(user?.accessToken)
    if (decodedToken.exp < (date.getTime() / 1000)) {
      const response = await refreshToken()

      console.log("refreshToken:",response)
      if (response?.success) {
        config.headers.Authorization = `Bearer ${response.accessToken}`
      }
    }
  }

    return config;
  }, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  });

// Thêm một bộ đón chặn response
axiosNormal.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  }, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
});
  
export {axiosNormal,axiosJWT}