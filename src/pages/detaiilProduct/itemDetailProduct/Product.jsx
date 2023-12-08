import React, { useEffect, useMemo, useState } from 'react';
import { FcOk } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate, useParams } from 'react-router';
import {toast} from "react-toastify"


import Woocommerce from './Woocommerce';
import Button from '@/components/button';
import { updateUser } from '@/services/userService';
import dataSizes from '@/data/dataSizes';
import { fetchingUser, setUserCurrent } from '@/store/reducerStore';
import {addProductToCart, getProduct, getProductToCart, getUserCurrent, updateProductToCart} from '@/api'
import SlideImages from './slideImages';


const Product = ({ handleProductView, dataProductView, handelErrorAddProductToCart }) => {
    const { slug } = useParams();
    const path = useLocation()
    const isLogin = useSelector((state) => state.store.isLogin);
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productCurrent, setProductCurrent] = useState({})
    const [sizeActive, setSizeActive] = useState(null);
    const [numberProduct, setNumberProduct] = useState(1);
    const [selectSize, setSelectSize] = useState(null);
    const [idCart, setIdCart] = useState(null);


    const isUpdateProductToCart = path?.pathname?.includes("cart")
    
    useEffect(() => {
        const refreshProduct = async () => {
            if (!isUpdateProductToCart) {
                setProductCurrent(dataProductView.product);
            } else {
                if (dataProductView?.success) {
                    const sizeIndexActive = dataProductView.product.product.sizes.findIndex(size => +size.size == dataProductView.product.size
                    )
                    setProductCurrent(dataProductView.product.product)
                    setNumberProduct(dataProductView.product.quantity)
                    setSelectSize(dataProductView.product.size)
                    setSizeActive(sizeIndexActive)
                    setIdCart(dataProductView.product._id)
                }
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
        if (numberProduct > 1) {
            setNumberProduct((number) => number - 1);
        }
    };

    const handleIncreaseNumber = () => {
        setNumberProduct((number) => number + 1);
    };

    const handleAddProduct = async () => {
        if (isLogin) {
            if (isUpdateProductToCart) {
                const data = await { product: productCurrent._id,size: selectSize, quantity: numberProduct }
                const res = await updateProductToCart(data, idCart, userCurrent.accessToken)
                if (res.success) {
                    await dispatch(fetchingUser(userCurrent.accessToken))
                    await navigate("/cart")
                } else {
                    toast.error(res.message)
                    
                }
            } else if (selectSize){

                const data = await { product: productCurrent._id, size: selectSize, quantity: numberProduct }
                const res = await addProductToCart(data, userCurrent.accessToken)
                if (res.success) {
                    await dispatch(fetchingUser(userCurrent.accessToken))
                    await navigate("/cart")
                } else {
                    handelErrorAddProductToCart(res.message)
                }
            }
        };
    }
        const handleBuy = async () => {
            if (isLogin) {
                if (isUpdateProductToCart) {
                    const data = await { product: productCurrent._id,size: selectSize, quantity: numberProduct }
                    const res = await updateProductToCart(data, idCart, userCurrent.accessToken)
                    if (res.success) {
                        await dispatch(fetchingUser(userCurrent.accessToken))
                        navigate("/buy")

                    } else {
                        toast.error(res.message)
                    }
                } else if (selectSize){
    
                    const data = await { product: productCurrent._id, size: selectSize, quantity: numberProduct }
                    const res = await addProductToCart(data, userCurrent.accessToken)
                    if (res.success) {
                        await dispatch(fetchingUser(userCurrent.accessToken))
                        navigate("/buy")
                    } else {
                        handelErrorAddProductToCart(res.message)
                    }
                }
            };
        };


        return (
            <>
                <div className="px-[15px] lg:px-0">
                    <div className="lg:grid lg:grid-cols-11 lg:gap-x-10">
                        {/* slide images */}
                        <div className="col-span-5 overflow-hidden">
                            <SlideImages productCurrent={productCurrent} />
                        
                        </div>

                        {/* summary product */}
                        <div className="col-span-6">
                            <div className="text-[27px] font-medium pb-4">{productCurrent?.title}</div>

                            <div className="flex items-end">
                                <span className="flex items-center text-[28px] font-bold text-primary">
                                    {productCurrent?.price}
                                </span>
                                <span className="line-through pb-[6px] pl-4 text-[17px] text-text-l2 font-semibold">
                                    {productCurrent?.priceDel}
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

                                    <span className="mx-3">{numberProduct}</span>
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
                                    className={`text-white ${selectSize ? 'bg-primary hover-primary' : 'bg-[#ee8282] cursor-not-allowed'
                                        }`}
                                    onClick={handleAddProduct}
                                >
                                    THÊM VÀO GIỎ HÀNG
                                </Button>

                                <Button className={` ml-1 text-white ${selectSize ? "bg-[#414141] lg:hover-cyan" : "bg-[#555555] cursor-not-allowed"}`} onClick={handleBuy}>
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

                    {/* quickly product */}
                    <Woocommerce productCurrent={productCurrent} />
                </div>
            </>
        );
    }


export default Product
