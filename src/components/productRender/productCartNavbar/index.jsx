import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AiFillCloseSquare } from 'react-icons/ai';

import { deleteProductToCartNoLogin, fetchingUser, setIdProductToCart } from '@/store/reducerStore';
import { deleteProductToCart } from '@/api';
import { changePriceToString } from '@/utils/helpers';

// render danh sách sản phẩm trong cart

const ProductCartNavbar = ({ cart, setTippyPc }) => {
    const isLogin = useSelector((state) => state.store.isLogin);
    const isMobile = useSelector((state) => state.store.isMobile);
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // chuyển đến trang detail product
    const handleFixProduct = (product) => {
        if (!isMobile) setTippyPc(true);
        navigate(`/cart/${product.product.slug}`);
        dispatch(setIdProductToCart(product._id));

        window.scrollTo(0, 0);
    };

    // delete product
    const handleDeleteProduct = async (e, pid) => {
        e.stopPropagation();

        if (!isLogin) {
            dispatch(deleteProductToCartNoLogin(pid));
        } else {
            await deleteProductToCart(userCurrent.accessToken, pid,dispatch,navigate);
            await dispatch(fetchingUser({accessToken:userCurrent.accessToken,dispatch,navigate}));
        }
    };

    return (
    <>
        {cart.map((elm, index) => (
            <div key={index}>
                <div
                    className="grid grid-cols-3 px-[10px] md:grid-cols-4 md:px-[80px] py-1 border-b-[1px] border-[#bebebe] cursor-pointer hover:border-primary pr-3 text-sm lg:pr-3 lg:pl-0"
                    onClick={() => handleFixProduct(elm)}
                >
                    {/* imgae */}
                    <div className="relative">
                        <img
                            className="md:w-[90px] md:h-[90px] lg:h-auto lg:w-auto"
                            src={elm?.product?.images[0].path}
                            alt="photo"
                        />
                        <div
                            className="absolute top-[2%] left-[2%] cursor-pointer select-none"
                            onClick={(e) => handleDeleteProduct(e, elm._id)}
                        >
                            <AiFillCloseSquare className="text-[20px] lg:text-[20px] lg:hover:text-primary" />
                        </div>
                    </div>

                    {/* tên, size, giá sản phẩm */}
                    <div className="col-span-2 md:col-span-3 my-auto">
                        <p>{elm.product?.title}</p>
                        <div className="flex justify-between pt-2">
                            <p>
                                <span>SIZE: </span>
                                <span>{elm.size}</span>
                            </p>
                            <p>
                                <span>{elm.quantity}</span>
                                <span className="mx-3">x</span>
                                <span>{changePriceToString(elm.product?.price)}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </>
    )
};

export default ProductCartNavbar;
