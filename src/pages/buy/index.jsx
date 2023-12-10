import React, { useEffect, useState, memo, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {toast} from "react-toastify"

import { AiOutlineHome, AiFillCheckCircle } from 'react-icons/ai';

import ProductBuy from './itemBuy/ProductBuy';
import { fetchingUser } from '@/store/reducerStore';
import FormAddress from './itemBuy/FormAddress';
import WrapperBill from '@/components/popper/WrapperBill';
import Button from '@/components/button';
import { createOrder, getCart } from '@/api';
import { changePriceToString } from '@/utils/helpres';

const Buy = () => {
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isLogin = useSelector((state) => state.store.isLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cart, setCart] = useState([])

    useEffect(() => {
        const refreshCart = async () => {
            const res = await getCart(userCurrent.accessToken)
            if (res.success) {
                setCart(res.cart.cart)
            } else {
                console.log(res.cart.cart)
            }
        }
        refreshCart()
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const totalProduct = userCurrent?.cart?.reduce((acc, cur) => {
        return acc + cur.quantity;
    }, 0);

    let price = useMemo(() => {
        const totalPrice = cart?.reduce((acc, cur) => (cur.product.price) * cur.quantity + acc, 0)
        if (totalProduct > 1) {
            return totalPrice
        } else {
            return totalPrice + 30000
        }
    }) 

    const initialValues = userCurrent.name
        ? {
            name: userCurrent.name,
            phone: userCurrent.mobile,
            province: userCurrent.address.province,
            district: userCurrent.address.district,
            ward: userCurrent.address.ward,
            address: userCurrent.address.addressDetail,
        }
        : {
            name: '',
            phone: '',
            province: '',
            district: '',
            ward: '',
            address: '',
        };
    
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });
    const onSubmit = async (values) => {
        if (totalProduct > 0) {
            const res = await createOrder(userCurrent.accessToken, values)
            if (res.success) {
                toast.success("Bạn đã đặt hàng thành công. Cảm ơn bạn đã ủng hộ cửa hàng.",{theme: "colored"})
            }
            await dispatch(fetchingUser(userCurrent.accessToken));
        }
    };



    const handleBackHome = () => {
        navigate('/');
        window.scrollTo(0, 0);
    };

    return (
        <div className="mt-[100px] max-w-[800px] mx-auto lg:mt-[10px]">

            <div className="flex items-center lg:bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <span
                    className="px-2 text-[#585858] hover:text-[#000000] text-sm md:text-base cursor-pointer"
                    onClick={handleBackHome}
                >
                    Trang chủ
                </span>
                <span>/</span>
                <span className="pl-2 text-[#585858]">Thanh toán</span>
            </div>
            <div className="p-[15px] bg-[#e7e7e7]">
                <div className="bg-white">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" p-[15px]">
                            <p className="font-bold text-[20px] text-center py-3">Thánh toán và giao hàng</p>

                            <FormAddress
                                errors={errors}
                                control={control}
                                reset={reset}
                                userCurrent={userCurrent}
                            />

                            <div className="py-3">
                                <p className="font-bold text-[18px]">Thông tin bổ sung</p>
                                <p className="text-text-l1 pb-1">Ghi chú đơn hàng (tuỳ chọn)</p>
                                <textarea
                                    placeholder="Ghi chú thêm về đơn hàng."
                                    className="w-[100%] h-[60px] outline-none border-[1px] border-[#6e6d6d] caret-[#ac3d3d] placeholder:px-1"
                                />
                            </div>
                        </div>
                        <div className="border-[1px] border-primary border-dashed p-[15px] bg-[#f7f7f7]">
                            {/* products oder */}
                            {totalProduct > 0 ? (
                                <ProductBuy cart={cart} />
                            ) : (
                                <p className="text-center py-10 text-lg">
                                    Chưa có sản phẩm nào để đặt. Xin vui lòng quay lại cửa hàng!
                                </p>
                            )}

                            {/* Bảng thanh toán */}
                            <WrapperBill>
                                <div className="mt-3">
                                    <div className="flex justify-between pb-1 text-[17px]">
                                        <p>Tạm tính:</p>
                                        <p>
                                            {totalProduct == 0 ? '0' : totalProduct == 1 ? changePriceToString(price - 30000) : changePriceToString(price)}
                                        </p>
                                    </div>
                                    <div className="flex justify-between pb-1">
                                        <p>Giao hàng:</p>
                                        {totalProduct <= 1 ? (
                                            <p className="font-bold">
                                                30.000 <span className="underline">đ</span>
                                            </p>
                                        ) : (
                                            <p>Miễn phí ship</p>
                                        )}
                                    </div>
                                    <div className="pb-2">
                                        <p className="font-semibold text-lg">Tổng:</p>
                                        <p className="flex justify-end font-bold text-lg">
                                            {totalProduct == 0
                                                ? 0
                                                : changePriceToString(price)
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Button */}
                                <div className="flex md:justify-end mt-3 flex-col md:flex-row">
                                    {totalProduct == 0 ? (
                                        <Button
                                            className="md:mr-2 bg-[#414141] text-white -order-1 md:-order-2 my-2 md:my-0 hover-cyan"
                                            onClick={handleBackHome}
                                        >
                                            QUAY TRỞ LẠI CỬA HÀNG
                                        </Button>
                                    ) : (
                                        ''
                                    )}

                                    <Button
                                        type="submit"
                                        className={`text-white -order-2 md:-order-1 ${
                                            totalProduct == 0
                                                ? 'bg-[#ee8282] cursor-not-allowed'
                                                : 'bg-primary hover-primary'
                                        }`}
                                    >
                                        ĐẶT HÀNG
                                    </Button>
                                </div>
                            </WrapperBill>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(Buy);
