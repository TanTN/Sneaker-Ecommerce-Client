import { refreshToken } from "@/api";
import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { resetAccessToken } from "../store/reducerStore";

const axiosNormal = axios.create({
    baseURL: import.meta.env.VITE_BASE_AXIOS || "https://sneaker-ecommerce-server.vercel.app/api/v1"
})


const handleRefreshToken = (refreshTokenCookie) => {
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  const now = new Date()
  const time = now.getTime();
  const expireTime = time + 7 * 24 * 60 * 60 * 1000;
  now.setTime(expireTime)
  document.cookie = `refreshToken=${refreshTokenCookie}; expires=`+now.toUTCString()+``
}

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
    handleRefreshToken(response?.data?.refreshToken)
  }
    return response;
  }, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
});


const axiosJWT = (dispatch,accessToken) => {
  const interceptorsAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_AXIOS || "https://sneaker-ecommerce-server.vercel.app/api/v1"
  })

  // Thêm một bộ đón chặn response
  interceptorsAxios.interceptors.response.use(function (response) {
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
  interceptorsAxios.interceptors.request.use(async function (config) {
    // Làm gì đó trước khi request dược gửi đi
  
    // xử lý access token khi hết hạn
    if (accessToken) {
      const date = new Date()
      const decodedToken = await jwtDecode(accessToken)
      if (decodedToken.exp < (date.getTime() / 1000)) {
        const refreshTokenCookie = document.cookie.split("=")[1]
        const response = await refreshToken(refreshTokenCookie)

        if (response?.refreshToken) {
          handleRefreshToken(response.refreshToken)
        }
        if (response?.success) {
          dispatch(resetAccessToken(response.accessToken))
          config.headers.Authorization = `Bearer ${response.accessToken}`
        } 
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
      return config;
    }, function (error) {
      // Làm gì đó với lỗi request
      return Promise.reject(error);
  });
  
  return interceptorsAxios
}

// Thêm một bộ đón chặn response

  
export {axiosNormal,axiosJWT}