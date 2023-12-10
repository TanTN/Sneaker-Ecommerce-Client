import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Input } from '@mui/material';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {fetchingUser} from "@/store/reducerStore"

import Button from '@/components/button';

import { AiOutlineLoading } from 'react-icons/ai';
import { forgotPassword,login } from '@/api';
import { message } from 'antd';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [valueEmail, setValueEmail] = useState("");

    // console.log(store)
    const initialValues = {
        email: '',
        password: '',
    };
    // forgot password
    const handleForgotPassword = async () => {
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
        if (!valueEmail.match(pattern)) { 
            toast.error("Hãy nhập email của bạn.", { theme: "colored" })
            return
        }
        const response = await forgotPassword(valueEmail)
        Swal.fire({
            title: response.message,
            icon: response?.success ? 'success' : 'error',
        }).then(result => {
            if (response?.success) {
                setIsForgotPassword(false)
                setValueEmail("")
            }
        })
        
    }

    const closeForgotPassword = () => {
        setIsForgotPassword(false);
        setValueEmail("")
    }

    return (
        <>
            {isForgotPassword &&
                <div className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-[#2b2b2b91] z-40">
                <div className='bg-white rounded-md px-[30px] py-[20px]'>
                    <p>Nhập email của bạn xuống bên dưới.</p>
                        <Input
                            type="email"
                            placeholder='Email...'
                            value={valueEmail}
                            onChange={e => setValueEmail(e.target.value)}
                            className='w-full'
                        />
                        <div className='flex justify-end items-center mt-[10px] gap-2'>
                        <Button className="bg-primary text-[#e7e7e7]" onClick={handleForgotPassword}>OK</Button>
                        <Button className="bg-primary text-[#e7e7e7]" onClick={closeForgotPassword}>Close</Button>
                    </div>
                </div>
                </div>
            }
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    email:Yup.string()
                    .trim()
                    .required('Email field is required')
                    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'),
                })}
                onSubmit={async (values) => {
                    const res = await login(values.email, values.password)
                    
                    if (res?.success) {
                        await dispatch(fetchingUser(res.user.accessToken));
                        await navigate('/');
                    } else {
                        toast.error(res.message,{theme: "colored"})
                    }
                }}
            >
                {(formik) => (
                    <div className="flex w-screen h-screen justify-center items-center bgLogin lg:bg-[rgb(209,178,217)] lg:noBg">
                        <div className="flex w-[90%] md:w-[50%] lg:w-[932px] lg:min-h-[600px] bg-white rounded-[10px] overflow-hidden">
    
                            {/* content left */}
                            <div className="hidden lg:flex flex-col gap-10 flex-1 text-white bgLogin p-[50px]">
                                <span className="text-[100px] leading-[100px] font-semibold font-Crimson">
                                    Roll Sneaker.
                                </span>
                                <p className="text-sm text-center">
                                    Tiền nhiệm là Shopgiayreplica.com™ - Shop Uy tín lâu năm chuyên cung cấp giày thể thao
                                    sneaker nam, nữ hàng Replica 1:1 - Like Auth với chất lượng khác biệt so với thị trường
                                    và giá tốt nhất. Shop có sẵn hàng tại 2 cơ sở Hà Nội, tp HCM. Giao hàng nhanh toàn quốc,
                                    đổi trả, bảo hành linh hoạt.
                                    <br /> Bạn không đủ hầu bao để mua 1 đôi Chính Hãng? Hay bạn order quá lâu cũng như size
                                    của mình đã Sold Out? Bạn đang cần tìm các mẫu Sneaker với mong muốn chất lượng, detail
                                    chuẩn hàng Auth? Roll Sneaker sẽ giải quyết hết thắc mắc của bạn với chất lượng cực kỳ
                                    khác biệt, đa dạng mẫu mã, có sẵn hàng. Liên tục cập nhật, update, fix các phiên bản
                                    tiệm cận hàng Auth nhất. Các bạn có thể yên tâm lựa chọn trong một thị trường rất hỗn
                                    loạn về chất lượng, cũng như định nghĩa chuẩn về Giày Replica - Like Auth.
                                </p>
                                <div>
                                    <span className=" font-medium text-white">Don't have account ?</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <button
                                        className="w-[50%] p-[5px] bg-white text-black font-medium"
                                        onClick={() => navigate('/register')}
                                    >
                                        Sign up
                                    </button>
                                    <p className="font-bold text-[#1a08b8]">or</p>
                                    <Link to="/" className="cursor-pointer hover:translate-y-[-2px] hover:text-sh">
                                        Back
                                    </Link>
                                </div>
                            </div>
    
                            {/* content right */}
                            <div className="flex gap-10 w-[100%] justify-center flex-col lg:flex-1 font-semibold p-[30px] md:p-[50px]">
                                <h1 className="font-Crimson leading-[50px] text-black">Login</h1>
                                <Form className="flex gap-4 flex-col">
    
                                    <div className="text-sm">
                                        <Field type="email" name="email" className="input-style" placeholder="Email" />
                                    </div>
                                    <div className="text-sm">
                                        <Field
                                            type="password"
                                            name="password"
                                            className="input-style"
                                            placeholder="Password"
                                        />
                                    </div>
    
                                    <button
                                        type="submit"
                                        className="flex gap-1 justify-center items-center p-[5px] w-[50%] text-center text-white bg-[#938eef]"
                                    >
                                        {formik.isSubmitting && (
                                            <AiOutlineLoading className="animate-fadeInLoadingIconRotate" />
                                        )}
                                        Sign in
                                    </button>
                                    <p className='text-[#6e6e6e] cursor-pointer' onClick={() => setIsForgotPassword(!isForgotPassword)} >Forgot your password?</p>
                                    
                                    {/* mobile */}
                                    <div className="flex gap-2 lg:hidden">
                                        <span className="font-medium text-[#6e6e6e]">Don't have account?</span>
                                        <span
                                            className=" text-black font-bold cursor-pointer"
                                            onClick={() => navigate('/register')}
                                        >
                                            Register
                                        </span>
                                        <p className="font-bold text-[#1a08b8]">or</p>
                                        <Link to="/" className="cursor-pointer font-bold hover:translate-y-[-2px]">
                                            Back
                                        </Link>
                                    </div>
    
                                </Form>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
};

export default Login;
