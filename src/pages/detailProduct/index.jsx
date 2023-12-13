import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams} from 'react-router';
import { memo } from 'react';
import { Link } from 'react-router-dom';



import { AiOutlineHome } from 'react-icons/ai';
import { RiInformationFill } from 'react-icons/ri';

import Product from './itemDetailProduct/Product';
import Button from '@/components/button';
import Tips from '../main/product/Tips';
import ProductMain from '@/components/productRender/productMain';
import { getProduct, getProductFilter, getProductToCart } from '@/api';


const DetailProduct = () => {
    const path = useLocation()
    const { slug } = useParams();

    const navigate = useNavigate();
    const userCurrent = useSelector(state => state.store.userCurrent)
    const cid = useSelector(state => state.store.idProductOnCart)
    const isLogin = useSelector(state => state.store.isLogin)

    const [productCurrent, setProductCurrent] = useState({})
    const [productWithCategory, setProductWithCategory] = useState([])
    const [messageErrorAddProductToCart, setMessageErrorAddProductToCart] = useState("")


    // ---

    const handelErrorAddProductToCart = (messageError) => {
        setMessageErrorAddProductToCart(messageError)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isUpdateProductToCart = path?.pathname?.includes("cart")

    useEffect(() => {

        const refreshProduct = async () => {
            if (isLogin) {
                if (!isUpdateProductToCart) {
                const dataProductView = await getProduct(slug);
                setProductCurrent(dataProductView);
                } else {
                const dataProductView = await getProductToCart(userCurrent.accessToken, cid)
                setProductCurrent(dataProductView.product);
                }
            } else {
                if (!isUpdateProductToCart) {
                    const dataProductView = await getProduct(slug);
                    setProductCurrent(dataProductView);
                } else {
                    const dataProductView = userCurrent.cart.find(elm => elm._id == cid)
                    setProductCurrent(dataProductView);
                    }
                }
        }
        
        refreshProduct()
    }, [path?.pathname,cid]);

    useEffect(() => {
        const refreshProduct = async () => {
            if (!isUpdateProductToCart) {
                const res = await getProductFilter({ category: productCurrent?.product?.product?.category })
                setProductWithCategory(res.products.slice(0,4));
            } else {
                const res = await getProductFilter({ category: productCurrent?.product?.category })
                setProductWithCategory(res.products.slice(0,4));
            }
        };
        refreshProduct()
    },[productCurrent])
    return (
        <div className="mt-[94px] max-w-[1140px] mx-auto lg:mt-[10px]">

            <div className="flex items-center bg-[#eeeeee] pl-4 py-2 mb-[10px] lg:mb-[40px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <Link to="/" className="pl-2 text-[#585858] hover:text-[#000000] text-sm md:text-base">
                    Trang chủ{' '}
                </Link>{' '}
                <p>&nbsp; /</p> {isUpdateProductToCart ? <p className='capitalize'>&nbsp; {productCurrent?.product?.product?.category?.toLowerCase()} &nbsp; / &nbsp;{productCurrent?.product?.product?.brand}</p>
                    : 
                    <p className='capitalize'>&nbsp; {productCurrent?.product?.category?.toLowerCase()} &nbsp; / &nbsp;{productCurrent?.product?.brand}</p>
                }
            </div>

            {messageErrorAddProductToCart && (
                <div className="flex flex-col md:flex-row justify-between md:items-center bg-[#f7f5f5] py-2 px-4 border-t-[2px] border-primary my-[25px]">
                    <div className="flex items-center break-all md:grow-[5]">
                        <RiInformationFill size={18} className="text-primary hidden md:inline-block" />
                        <p className="break-words text-[14px] ml-1">
                            {messageErrorAddProductToCart}
                        </p>
                    </div>
                    <div className="mt-2 md:grow-[1] md:ml-[15px] md:mt-0">
                        <Button className="bg-black text-white hover-cyan " onClick={() => navigate('/cart')}>
                            XEM GIỎ HÀNG
                        </Button>
                    </div>
                </div>
            )}

            <Product
                dataProductView={productCurrent}
                handelErrorAddProductToCart={handelErrorAddProductToCart}
            />

            <div className="px-[15px] lg:px-0 pt-[50px]">
                <ProductMain dataProduct={productWithCategory} title={'SẢN PHẨM TƯƠNG TỰ'} isReload />
            </div>

            <Tips />
        </div>
    );
};

export default memo(DetailProduct);
