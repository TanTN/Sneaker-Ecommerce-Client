import React from 'react';
import { useNavigate } from 'react-router';

import { IoClose } from "react-icons/io5";

import LoadingImage from '@/components/loading/loadingImage';
import Image from '@/components/Image';
import { changePriceToString } from '@/utils/helpers';
import { deleteProduct } from '@/api';
import { useDispatch, useSelector } from 'react-redux';

// render sản phẩm trong phàn home
const ProductHome = ({ dataProduct, title, category ,fetchingProduct}) => {

    const userCurrent = useSelector(state => state.store.userCurrent)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // chuyển đến trang detail product
    const handleNavigateProductDetail = async (data) => {
        await navigate(`/${data.slug}`);
    };

    // xóa sản phẩm
    const handleDeleteProduct = async (e, pid) => { 
        e.stopPropagation()
        await deleteProduct(userCurrent.accessToken, dispatch, navigate, pid)
        await fetchingProduct()
    }
    return (
        <div className="mb-[50px] overflow-hidden md:mb-[70px]">
            {/* sản phẩm nổi bật */}
            {title && <h2 className="text-center mb-[20px] md:mb-[40px]">{title}</h2>}

            <div className="grid gap-5 grid-cols-2 md:grid-cols-4 md:gap-10">
                {dataProduct?.length == 0 ? (
                    <LoadingImage />
                ) : (
                        dataProduct?.map((data, index) => (
                            <div key={index}>
                            
                            <div className="group/item relative cursor-pointer" onClick={() => handleNavigateProductDetail(data)}>

                                {/* xóa sản phẩm */}
                                {category && (
                                    <div className='absolute text-white text-center leading-[20px] bg-black rounded-md w-[20px] h-[20px] text-[20px] z-[20] top-[10px] right-[5px] hover:bg-primary'
                                        onClick={(e) => handleDeleteProduct(e,data._id)}
                                    >
                                        <IoClose />
                                    </div>
                                )}

                                <div className="lg:h-[268px] overflow-hidden">
                                    {/* image product */}
                                    <div className={`group/edit lg:opacity-100 ${data?.images.length > 1 ? "lg:group-hover/item:opacity-0" : ""} lg:w-[100%] lg:h-[100%] flex items-center`}>
                                            <img src={data?.images[0]?.path} alt="product1" className="lg:scale-125 object-cover" />
                                    </div>
                                    <div className={`group/edit opacity-0 ease-in-out duration-[0.8s] transition-opacity ${data?.images.length > 1 ? "lg:group-hover/item:opacity-100" : ""} lg:group-hover/item:transition-opacity lg:group-hover/item:duration-[1s] lg:group-hover/item:ease-in-out overflow-hidden absolute left-0 top-0 right-0`}>
                                        <Image
                                            className="lg:group-hover/item:animate-fadeInImg object-cover" 
                                            src={data?.images[1]?.path}
                                            alt="product"
                                        />
                                    </div>
                                    
                                </div>
                                {/* % sale */}
                                {data?.onSale && <div className="absolute top-2 left-2 bg-primary text-white font-bold w-[50px] h-[50px] text-center leading-[50px] rounded-[50%]">
                                    {data.onSale}
                                </div>}

                                {/* ruy-băng sale */}
                                {data?.ribbonSale && (
                                    <div className="absolute top-0 right-0 block overflow-hidden w-[var(--width-box-deal)] h-[var(--width-box-deal)] md:w-[var(--width-box-deal-md)] md:h-[var(--width-box-deal-md)]">
                                        <div className="absolute text-sm top-[15px] left-[-2px] w-[var(--width-deal)] shadow-[#b8b8b8] shadow-md text-center rotate-[45deg] bg-primary text-white font-semibold md:w-[var(--width-deal-md)] md:top-[16px] md:left-[1px] md:text-base lg:text-lg">
                                            {data?.ribbonSale}
                                        </div>
                                    </div>
                                )}

                                {/* tên sản phẩm */}
                                <p className="text-center font-semibold text-[#505050] md:text-[18px] hover:text-[#23527c] cursor-pointer">
                                    {data?.title}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 md:flex md:flex-col md:gap-0 lg:flex lg:flex-row justify-center items-center mt-2 lg:gap-2 text-center">
                                
                                {/* giá sản phẩm */}
                                {data?.price ?
                                    <>
                                        
                                        <div className="text-[15px] font-bold text-[#ce1111] md:text-[18px]">
                                        {changePriceToString(data?.price)}
                                        </div>

                                        {/* giá sản phẩm khi giảm giá */}
                                        {data?.priceDel && (
                                            <div className="text-[14px] font-semibold line-through text-[#adadad] md:text-[16px]">
                                                {changePriceToString(data?.priceDel)}
                                            </div>
                                        )}
                                    </>

                                    // khi hết hàng
                                    : <div className="text-[15px] font-bold text-[#ce1111] md:text-[18px]">Liên hệ</div>
                                    
                                }
                            </div>

                        </div>
                    ))
                )}
                
            </div>
        </div>
    );
};

export default ProductHome;
