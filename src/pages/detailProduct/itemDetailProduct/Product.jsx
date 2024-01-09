import React, { useEffect, useMemo, useState } from 'react';
import { FcOk } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router';
import { toast } from "react-toastify"

import { VscLoading } from "react-icons/vsc";

import Woocommerce from './Woocommerce';
import Button from '@/components/button';
import { addProductToCartNoLogin, fetchingUser, updateProductToCartNoLogin } from '@/store/reducerStore';
import {addProductToCart, updateProductToCart} from '@/api'
import SlideImages from '@/pages/detailProduct/itemDetailProduct/SlideImages';
import { changePriceToString } from '@/utils/helpers';

const Product = ({ dataProductView, handelErrorAddProductToCart }) => {
    const path = useLocation()

    const isLogin = useSelector((state) => state.store.isLogin);
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productCurrent, setProductCurrent] = useState({})
    const [sizeActive, setSizeActive] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectSize, setSelectSize] = useState(null);
    const [idCart, setIdCart] = useState(null);
    const [isLoadingBuy,setIsLoadingBuy] = useState(false)
    const [isLoadingCart,setIsLoadingCart] = useState(false)

    const isUpdateProductToCart = path?.pathname?.includes("cart")

    useEffect(() => {
        const refreshProduct = async () => {
            if (!isUpdateProductToCart) {
                setProductCurrent(dataProductView?.product);
            } else {
                    const sizeIndexActive = dataProductView?.product?.sizes?.findIndex(size => +size.size == dataProductView.size
                    )
                    setProductCurrent(dataProductView?.product)
                    setQuantity(dataProductView?.quantity)
                    setSelectSize(dataProductView?.size)
                    setSizeActive(sizeIndexActive)
                    setIdCart(dataProductView?._id)
            }
        };
        refreshProduct()
    }, [dataProductView]);

    const handleClearSize = () => {
        setSizeActive(null);
        setSelectSize(null)
    };

    const handelSelectSize = (e, index) => {
        const { value, checked } = e.target;
        setSelectSize(value);
        setSizeActive(index);
        if (!checked) {
            handleClearSize();
        }
    };

    const handleMinusNumber = () => {
        if (quantity > 1) {
            setQuantity((number) => number - 1);
        }
    };

    const handleIncreaseNumber = () => {
        setQuantity((number) => number + 1);
    };

    const handleAddProduct = async () => {
        if (isLogin && !isLoadingCart) {
            setIsLoadingCart(true)
            if (isUpdateProductToCart) {
                // khi update sản phẩm
                const data = await { product: productCurrent._id,size: selectSize, quantity: quantity }
                const res = await updateProductToCart(data, idCart, userCurrent.accessToken,dispatch,navigate)
                if (res.success) {
                    await dispatch(fetchingUser({accessToken:userCurrent.accessToken,dispatch,navigate}))
                    await navigate("/cart")
                } else {
                    toast.error(res.message)
                    
                }
            } else if (selectSize) {

                // thêm sản phẩm mới vào giỏ hàng
                const data = await { product: productCurrent._id, size: selectSize, quantity: quantity }
                const res = await addProductToCart(data, userCurrent.accessToken,dispatch,navigate)
                if (res.success) {
                    await dispatch(fetchingUser({accessToken:userCurrent.accessToken,dispatch,navigate}))
                    await navigate("/cart")
                } else {
                    handelErrorAddProductToCart(res.message)
                }
            }
            setIsLoadingCart(false)
        } else {
            if (!isLoadingCart) {
                setIsLoadingCart(true)
                if (isUpdateProductToCart) {
                    
                    // khi update sản phẩm
                    const indexProductExists = userCurrent.cart.findIndex(elem => elem._id == dataProductView._id)
                    const data = { product: productCurrent,size: selectSize, quantity: quantity}
                    dispatch(updateProductToCartNoLogin({ indexProduct: indexProductExists, product: data }))
                    navigate("/cart")
                } else if (selectSize) {

                    // thêm sản phẩm mới vào giỏ hàng
                    const indexProductExists = userCurrent.cart.findIndex(elem => {
                        return elem.product.title == productCurrent.title && elem.size == selectSize
                    })
                    if (indexProductExists != -1) {
                        handelErrorAddProductToCart(`Bạn không thể thêm "${productCurrent.title} - ${selectSize}" khác vào giỏ hàng của bạn.`)
                    } else {
                        const data = {product:productCurrent,size: selectSize, quantity,_id:uuidv4()}
                        dispatch(addProductToCartNoLogin(data))
                        navigate("/cart")
                    }
                }
                setIsLoadingCart(false)
            }
        }
    }
        const handleBuy = async () => {
            if (isLogin && !isLoadingBuy) {
                setIsLoadingBuy(true)

                if (isUpdateProductToCart) {

                    // khi update sản phẩm
                    const data = await { product: productCurrent._id,size: selectSize, quantity: quantity }
                    const res = await updateProductToCart(data, idCart, userCurrent.accessToken,dispatch,navigate)
                    if (res.success) {
                        navigate("/buy")
                        await dispatch(fetchingUser({accessToken:userCurrent.accessToken,dispatch,navigate}))
                        
                    } else {
                        toast.error(res.message)
                    }
                } else if (selectSize){
                    // thêm sản phẩm mới vào giỏ hàng
                    const data = await { product: productCurrent._id, size: selectSize, quantity: quantity }
                    const res = await addProductToCart(data, userCurrent.accessToken,dispatch,navigate)
                    if (res.success) {
                        navigate("/buy")
                        await dispatch(fetchingUser({accessToken:userCurrent.accessToken,dispatch,navigate}))
                        
                    } else {
                        toast.error(res.message)
                    }
                }
                setIsLoadingBuy(false)
            } else {
                if (!isLoadingBuy){
                    setIsLoadingBuy(true)
                    if (isUpdateProductToCart) {
                        // khi update sản phẩm
                        const indexProductExists = userCurrent.cart.findIndex(elem => elem.id == dataProductView.id)
                        const data = { product: productCurrent,size: selectSize, quantity: quantity}
                        navigate("/buy")
                        dispatch(updateProductToCartNoLogin({ indexProduct: indexProductExists, product: data }))
                    } else if (selectSize) {
                        // thêm sản phẩm mới vào giỏ hàng
                        const indexProductExists = userCurrent.cart.findIndex(elem => {
                            return elem.product.title == productCurrent.title && elem.size == selectSize
                        })
                        if (indexProductExists == -1) {
                            const data = {product:productCurrent,size: selectSize, quantity,_id:uuidv4()}
                            dispatch(addProductToCartNoLogin(data))
                        } 
                        navigate("/buy")
                    }
                    setIsLoadingBuy(false)
                }
            }
        };


        return (
            <>
                <div className="px-[15px] lg:px-0">
                    <div className="lg:grid lg:grid-cols-11 lg:gap-x-10">
                        {/* slide hình ảnh */}
                        <div className="col-span-5 overflow-hidden mb-[10px] md:mb-[0]">
                            <SlideImages productCurrent={productCurrent} />
                        </div>

                        {/* thông tin sản phẩm */}
                        <div className="col-span-6">
                            <div className="text-[27px] font-medium pb-4">{productCurrent?.title}</div>

                            <div className="flex items-end">
                                <span className="flex items-center text-[28px] font-bold text-primary">
                                    {changePriceToString(productCurrent?.price)}
                                </span>
                                <span className="line-through pb-[6px] pl-4 text-[17px] text-text-l2 font-semibold">
                                    {changePriceToString(productCurrent?.priceDel)}
                                </span>
                            </div>

                            <div className="flex py-3 md:items-center">
                                <div className="relative md:leading-0 leading-[33px]">
                                    <p className="font-semibold pb-2">SIZE:</p>
                                    {selectSize && (
                                        <p
                                            className="text-c1 cursor-pointer absolute left-0 top-[35px] md:top-[26px]"
                                            onClick={handleClearSize}
                                        >
                                            Xóa
                                        </p>
                                    )}
                                </div>

                                <div className="flex pl-6 flex-wrap">
                                    {productCurrent?.sizes?.map((data, index) => (
                                        <div key={index} className="pl-2 pb-2">
                                            <div
                                                className={`flex cursor-pointer w-[40px] border-[1px] border-[#ccc] ${sizeActive === index && +data.quantity > 0 ? 'border-primary' : 'border-[#ccc] text-[#ccc]'
                                                    }`}
                                            >
                                                <label
                                                    htmlFor={data.size}
                                                    className="text-[18px] m-y-auto select-none w-[100%] leading-[30px] text-center text-text-l1 cursor-pointer md:hover:bg-[#e7e7e7d8]"
                                                >
                                                    {data.size}
                                                </label>
                                                <input
                                                    hidden
                                                    type="checkbox"
                                                    id={data.size}
                                                    value={data.size}
                                                    name={data.size}
                                                    onChange={(e) => handelSelectSize(e, index)}
                                                    checked={sizeActive == index ? true : false}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="text-[18px] mt-2">
                                <p className="">
                                    <span>Số lượng:</span>
                                    <span
                                        className="select-none ml-3 px-3 border-[1px] border-[#ccc] cursor-pointer lg:hover:bg-[#e7e7e7]"
                                        onClick={handleMinusNumber}
                                    >
                                        -
                                    </span>

                                    <span className="mx-3">{quantity}</span>
                                    <span
                                        className="select-none px-3 border-[1px] border-[#ccc] cursor-pointer lg:hover:bg-[#e7e7e7]"
                                        onClick={handleIncreaseNumber}
                                    >
                                        +
                                    </span>
                                </p>
                            </div>

                            <div className="flex pt-4 pb-2">
                                <Button
                                    className={`text-white flex gap-1 items-center ${selectSize ? 'bg-primary hover-primary' : 'bg-[#ee8282] cursor-not-allowed'
                                        }`}
                                    onClick={handleAddProduct}
                                >
                                    {isLoadingCart && <div className='animate-fadeInLoadingIconRotate'><VscLoading /></div>}
                                    THÊM VÀO GIỎ HÀNG
                                </Button>

                                <Button className={` ml-1 flex gap-1 items-center text-white ${selectSize ? "bg-[#414141] lg:hover-cyan" : "bg-[#555555] cursor-not-allowed"}`} onClick={handleBuy}>
                                    {isLoadingBuy && <div className='animate-fadeInLoadingIconRotate'><VscLoading /></div>}
                                    MUA NGAY
                                </Button>
                            </div>

                            <div className="border-[1px] border-dashed border-primary p-[15px] mt-3 rounded-lg">
                                <p className="text-[18px] font-bold">
                                    Sôi Động Khuyến Mãi Dịp Tết 2023 <span className="text-primary">Siêu Sale 35%</span>
                                </p>
                                <ul>
                                    <li className="py-[5px] leading-6">
                                        <FcOk className="inline-block text-[20px]" />
                                        <span className="pl-2 text-[18px]">
                                            Cam kết chất lượng như hình ảnh, video đăng tải trên Web
                                        </span>
                                    </li>
                                    <li className="py-[5px] leading-6">
                                        <FcOk className="inline-block text-[20px]" />
                                        <span className="pl-2 text-[18px]">Double Box kèm chống sốc khi giao hàng</span>
                                    </li>
                                    <li className="py-[5px] leading-6">
                                        <FcOk className="inline-block text-[20px]" />
                                        <span className="pl-2 text-[18px]">
                                            Giao hàng nhanh 60 phút trong nội thành Hà Nội và tp Hcm
                                        </span>
                                    </li>
                                    <li className="py-[5px] leading-6">
                                        <FcOk className="inline-block text-[20px]" />
                                        <span className="pl-2 text-[18px]">
                                            Nhận hàng và kiểm tra trước khi thanh toán.
                                        </span>
                                    </li>
                                    <li className="py-[5px] leading-6">
                                        <FcOk className="inline-block text-[20px]" />
                                        <span className="pl-2 text-[18px]">Hỗ Trợ đổi trả size linh hoạt</span>
                                    </li>
                                </ul>
                            </div>

                            <div className='text-[15px] text-text-l1 mt-3'><span className='font-semibold'>Mã:&nbsp;</span>{productCurrent?.code}</div>
                            <div className='text-[15px] text-text-l1 mt-2'><span className='font-semibold'>Thương hiệu:&nbsp;</span>{productCurrent?.brand}</div>
                        </div>
                    </div>

                    {/* thông tin chi tiết sản phẩm */}
                    <Woocommerce productCurrent={productCurrent} />
                </div>
            </>
        );
    }


export default Product
