import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Wrapper from '@/components/popper/Wrapper';
import {ProductInCartNav} from '@/components/productRender/productInCartNav';
import { changePriceToString } from '@/utils/helpers';
import { getCart } from '@/api';


const Cart = ({ children }) => {
    const isMobile = useSelector((state) => state.store.isMobile);
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isLogin = useSelector((state) => state.store.isLogin);
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [tippyPc, setTippyPc] = useState(false);

    const price = cart?.reduce((acc, elm) => ((elm.product.price) * +elm.quantity) + acc, 0);

    useEffect(() => {
        setTippyPc(false);
    }, [tippyPc]);

    useEffect(() => {
        if (isLogin) {
            const refreshCart = async () => {
            const res = await getCart(userCurrent.accessToken);
            if (res.success) {
                setCart(res.cart.cart);
            }
        };
            refreshCart();
        } else {
            setCart(userCurrent.cart)
        }
    }, [userCurrent]);

    const hiddenCart = () => {
        setTippyPc(true);
        window.scrollTo(0, 0);
    };

    const handleClickCart = () => {
        if (isMobile) {
            navigate('/cart');
        }
    };

    const lengthProduct = cart.length;

    // config cart Tippy on Pc
    const isTippy = tippyPc || isMobile ? { visible: false } : { trigger: 'mouseenter' };
    const offset = lengthProduct < 1 ? { offset: [-102, 22] } : { offset: [-148, 22] };
    return (
        <div onClick={handleClickCart}>
            <Tippy
                delay={[200, 300]}
                placement="bottom"
                interactive
                zIndex="20"
                {...isTippy}
                {...offset}
                render={(attrs) => (
                    <Wrapper className="overflow-hidden ml-[-5px] lg:ml-0" tabIndex="-1" {...attrs}>
                        <div className="relative bg-white drop-shadow-ShadowRoot lg:h-auto lg:max-w-[375px]">
                            {lengthProduct < 1 ? (
                                <div className="bg-white flex drop-shadow-ShadowRoot w-[100%] h-[100%] px-6">
                                    <div className="m-auto">
                                        <div className="p-3 md:pr-0">
                                            <img
                                                className="mx-auto"
                                                src="https://theme.hstatic.net/1000285106/1000912959/14/cart_empty_background.png?v=120"
                                                alt="cart"
                                            />
                                        </div>
                                        <div className="text-center text-sm py-3">
                                            Chưa có sản phẩm nào trong giỏ hàng
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="max-h-[33vh] p-[10px] overflow-y-auto">
                                        <ProductInCartNav cart={cart} setTippyPc={setTippyPc} />
                                    </div>

                                    <div>
                                        <div className="text-[15px] text-center border-t-[1px] border-[#c7c7c7] bg-[#e2e2e2] py-[3px]">
                                            <span className="font-bold">Tổng số phụ: </span>
                                            <span>{changePriceToString(price)}</span>
                                        </div>
                                        <div className="bg-[#383737] grid grid-cols-2 md:text-sm text-[#e4e4e4]">
                                            <Link
                                                to="/cart"
                                                className="text-center border-r-[1px] border-r-[#d3d3d3] hover:text-white h-[100%] hover:bg-[#000000] py-[3px]"
                                                onClick={hiddenCart}
                                            >
                                                XEM GIỎ HÀNG
                                            </Link>
                                            <Link
                                                to="/buy"
                                                className="text-center h-[100%] lg:hover:bg-[#000000] hover:text-white py-[3px]"
                                                onClick={hiddenCart}
                                            >
                                                THANH TOÁN
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Wrapper>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
};

export default Cart;
