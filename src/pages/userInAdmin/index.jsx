import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { Avatar } from '@mui/material';

import { RiSmartphoneFill } from 'react-icons/ri';
import { MdEmail } from "react-icons/md";
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { IoCaretUpSharp, IoCaretDownSharp } from 'react-icons/io5';

import Button from '@/components/button';
import ProductTable from '@/components/productRender/productTable';
import { deleteUser, getCartUser, getOrderUser, getUser } from '@/api';
import { fetchingUsers } from '../../store/reducerStore';

const UserInAdmin = () => {

    const { userId } = useParams();
    const navigate = useNavigate();
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const dispatch = useDispatch()

    const [user, setUser] = useState({})

    const [productOrder, setProductOrder] = useState([]);
    const [productInCart, setProductInCart] = useState([]);
    const [showProductInCart, setShowProductInCart] = useState(false);
    const [showProductOrder, setShowProductOrder] = useState(false);

    useEffect(() => {
        setShowProductInCart(false);
        setShowProductOrder(false);
    }, [userId])
    
    useEffect(() => {
        const fetchingData = async () => {

            const resUser = await getUser(userCurrent.accessToken, userId, dispatch,navigate)
            if (resUser.success) {
                setUser(resUser.user)
            }
            const resOrder = await getOrderUser(userCurrent.accessToken, userId,dispatch,navigate)

            if (resOrder.success) {
                setProductOrder(resOrder.order)
            }
            const resCart = await getCartUser(userCurrent.accessToken, userId,dispatch,navigate)
            if (resCart.success) {
                setProductInCart(resCart.cart.cart)
            }
        }
    
        fetchingData()
    }, [userId]);

    const handleDeleteUser = async () => {
        const res = await deleteUser(userCurrent.accessToken, userId,dispatch,navigate)
        if (res.success) { 
            await dispatch(fetchingUsers({accessToken:userCurrent.accessToken,dispatch,navigate}))
            navigate(`/admin/user/${userCurrent._id}`);
        }

    };

    return (
        <div className="relative">

            <div className="flex items-center lg:bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <Link to="/" className="px-2 text-[#585858] hover:text-[#000000] text-sm md:text-base cursor-pointer">
                    Trang chủ
                </Link>
                <span>/</span>
                <span className="pl-2 text-[#585858]">User</span>
            </div>

            <div className="flex items-center gap-1 mt-[30px]">
                <h3>Thông tin tài khoản người dùng :</h3>
            </div>

            <div className="flex flex-col gap-2 mt-[20px] mb-[50px]">

                <Avatar
                    src={user?.avatar?.path}
                    className="relative border-[1px] border-[#a02222]"
                    sx={{ height: 55, width: 55, fontSize: 35, fontWeight: 'normal' }}
                    alt={user?.name}
                >
                </Avatar>

                <p className='text-[18px]'>Role: {user.role}</p>

                <p className="text-[18px]">
                    Tên tài khoản: <span className="font-medium">{user?.name}</span>!
                </p>

                <div className="flex items-center">
                    <AiFillHome />
                    <p className="px-1 text-[18px]">Địa chỉ: {user?.address?.ward.label ? `${user?.address?.ward.label} - ${user?.address?.district.label} - ${user?.address?.province.label}` : "Việt Nam"}</p>
                </div>

                <div className="flex items-center">
                    <MdEmail />
                    <p className="px-1 text-[18px]">Email: {user?.email}</p>
                </div>

                <div className="flex items-center">
                    <RiSmartphoneFill />
                    <p className="px-1 text-[18px]">Điện thoại: {user?.mobile}</p>
                </div>

                {user.role !== "Admin" && (
                    <div>
                        <Button className="bg-primary leading-[18px] text-white hover-primary" onClick={handleDeleteUser}>
                            Xóa người dùng
                        </Button>
                    </div>
                )}

                <div>
                    <div className={`flex items-center gap-1 ${productInCart.length < 1 ? 'text-[#969696]' : ''}`}>
                        <p
                            className="text-[18px] cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (productInCart.length > 0) setShowProductInCart(!showProductInCart);
                            }}
                        >
                            Sản phẩm trong giỏ hàng
                        </p>
                        {showProductInCart ? <IoCaretDownSharp className="text-primary" /> : <IoCaretUpSharp />}
                    </div>
                </div>

                {showProductInCart && (
                    <div className='border-[1px] border-primary border-dashed p-[15px]'>
                        <ProductTable cart={productInCart} isVisible />
                    </div>
                )}

                <div>
                    <div className={`flex items-center gap-1 ${productOrder.length < 1 ? 'text-[#969696]' : ''}`}>
                        <p
                            className="text-[18px] cursor-pointer "
                            onClick={(e) => {
                                e.stopPropagation();
                                if (productOrder.length > 0) setShowProductOrder(!showProductOrder);
                            }}
                        >
                            Đơn hàng đã đặt
                        </p>
                        {showProductOrder ? <IoCaretDownSharp className="text-primary" /> : <IoCaretUpSharp />}
                    </div>
                </div>
                
                {showProductOrder && (
                    productOrder?.map((product, index) =>
                        <div key={product._id} className='border-[1px] border-primary border-dashed p-[15px]'>
                        <p className='text-[18px]'>Đơn hàng số: {index + 1}</p>
                        <ProductTable cart={product.product} isVisible />
                    </div>
                    ) 
                )}
            </div>
            {/* {isLoading && (
                <div className="absolute top-0 bottom-0 right-0 left-0 m-auto">
                    <LoadingPage loadingUser />
                </div>
            )} */}
        </div>
    );
};

export default UserInAdmin;
