import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Input } from '@mui/material'
import Button from '@/components/button'
import Wrapper from '@/components/popper/Wrapper'
import { changePassword } from "@/api"
import Swal from "sweetalert2"

const ForgotPassword = () => {
    const { token } = useParams()
    const [valuePassword, setValuePassword] = useState("")

    const handleChangePassword = async () => {
        const response = await changePassword(valuePassword.toString(), token)
        Swal.fire({
            icon: response?.success ? 'success' : 'error',
            title: response.message,
            text: response?.success && "Bạn hãy quay lại phần đăng nhập!"
        })
    }

  return (
    <div className='fixed bgLogin justify-center items-center flex top-0 left-0 right-0 bottom-0 bg-[#3b3b3b] '>
          <Wrapper className='bg-[#f7f7f7] px-[30px] py-[20px]'>
              <p>Nhập mật khẩu mới của bạn xuống bên dưới.</p>
              <Input
                  type='text'
                  placeholder='new password...'
                  value={valuePassword}
                  onChange={e => setValuePassword(e.target.value)}
                  className='w-full'
              />
              <div className='flex justify-end mt-[10px]'>
                  <Button className="bg-primary text-[#ebebeb]" onClick={handleChangePassword}>OK</Button>
              </div>
        </Wrapper>
    </div>
  )
}

export default ForgotPassword