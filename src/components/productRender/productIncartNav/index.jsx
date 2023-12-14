import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AiFillCloseSquare } from 'react-icons/ai';

import { deleteProductToCartNoLogin, fetchingUser, setIdProductToCart } from '@/store/reducerStore';
import { deleteProductToCart } from '@/api';
import { changePriceToString } from '@/utils/helpers';

const ProductInCartNav = ({ cart, setTippyPc }) => {
    const isLogin = useSelector((state) => state.store.isLogin);
    const isMobile = useSelector((state) => state.store.isMobile);
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFixProduct = (product) => {
        if (!isMobile) setTippyPc(true);
        navigate(`/cart/${product.product.slug}`);
        dispatch(setIdProductToCart(product._id));

        window.scrollTo(0, 0);
    };

    const handleDeleteProduct = async (e, pid) => {
        e.stopPropagation();

        if (!isLogin) {
            dispatch(deleteProductToCartNoLogin(pid));
        } else {
            await deleteProductToCart(userCurrent.accessToken, pid);
            await dispatch(fetchingUser(userCurrent.accessToken));
        }
    };

    return cart.map((elm, index) => (
        <div key={index}>
            <div
                className="grid grid-cols-3 px-[10px] md:grid-cols-4 md:px-[80px] py-1 border-b-[1px] border-[#bebebe] cursor-pointer hover:border-primary pr-3 text-sm lg:pr-3 lg:pl-0"
                onClick={() => handleFixProduct(elm)}
            >
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
                <div className="col-span-2 md:col-span-3 my-auto">
                    <p>{elm.product.title}</p>
                    <div className="flex justify-between pt-2">
                        <p>
                            <span>SIZE: </span>
                            <span>{elm.size}</span>
                        </p>
                        <p>
                            <span>{elm.quantity}</span>
                            <span className="mx-3">x</span>
                            <span>{changePriceToString(elm.product.price)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ));
};

export default ProductInCartNav;
