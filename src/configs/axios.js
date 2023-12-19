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
axiosNormal.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
  // Làm gì đó với dữ liệu 

  if (response?.data?.refreshToken) {
      document.cookie = `refreshToken=${response.data.refreshToken}; expires=${new Date("2023-12-19 10:10:00").toUTCString()}`
    }
    return response;
  }, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
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

  const newStore = {...JSON.parse(store)}
  const user = JSON.parse(store).userCurrent

  if (user?.accessToken) {
    const date = new Date()
    const decodedToken = await jwtDecode(user?.accessToken)
    if (decodedToken.exp < (date.getTime() / 1000)) {
      console.log(1)
      const refreshTokenCookie = document.cookie.split("=")[1]
      
      const response = await refreshToken(refreshTokenCookie)

      if (response?.refreshToken) {
        const now = new Date()
        const time = now.getTime();
        const expireTime = time + 7 * 24 * 60 * 60 * 1000;
        now.setTime(expireTime);

        document.cookie = `refreshToken=${response.refreshToken}; expires=`+now.toUTCString()+``
      }

      if (response?.success) {
        newStore.userCurrent.accessToken = response.accessToken
        window.localStorage.setItem("persist:root", JSON.stringify({store: newStore}))
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

  
export {axiosNormal,axiosJWT}