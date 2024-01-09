import { refreshToken } from "@/api";
import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { resetAccessToken, setLogoutUser } from "../store/reducerStore";
import Swal from 'sweetalert2';


// đưa refresh token mới vào trong cookie và xóa refresh token cũ khi call api refreshToken
const handleRefreshToken = (refreshTokenCookie) => {
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  const now = new Date()
  const time = now.getTime();
  const expireTime = time + 7 * 24 * 60 * 60 * 1000;
  now.setTime(expireTime)
  document.cookie = `refreshToken=${refreshTokenCookie}; expires=`+now.toUTCString()+``
}

// cấu hình axios khi chưa đăng nhập
const axiosNormal = axios.create({
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
    handleRefreshToken(response?.data?.refreshToken)
  }
    return response;
  }, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
});

// cấu hình axios và sử lý lấy access token khi hết hạn
const axiosJWT = (dispatch,navigate,accessToken) => {
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
        const refreshTokenCookie = await document.cookie.split("=")[1]
        const response = await refreshToken(refreshTokenCookie)
        
        if (response?.success) {
          handleRefreshToken(response.refreshToken)
          dispatch(resetAccessToken(response.accessToken))
          config.headers.Authorization = `Bearer ${response.accessToken}`
        } else {
          Swal.fire({
            title: "Tài khoản của bạn đã được đăng nhập ở một nơi khác, xin hãy đăng nhập lại.",
            icon: "warning",
          }).then(result => {
            document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            navigate("/login")
            dispatch(setLogoutUser())
          })
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