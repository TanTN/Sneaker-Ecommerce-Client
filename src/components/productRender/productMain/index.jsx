import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import LoadingImage from '@/components/loading/loadingImage';
import Image from '@/components/Image';
import { changePriceToString } from '@/utils/helpers';

const ProductMain = ({ dataProduct, title }) => {
    const navigate = useNavigate();
    const handleNavigateProductDetail = async (data) => {
        await navigate(`/${data.slug}`);

    };
    return (
        <div className="mb-[50px] overflow-hidden md:mb-[70px]">
            {title && <h2 className="text-center mb-[20px] md:mb-[40px]">{title}</h2>}

            <div className="grid gap-5 grid-cols-2 md:grid-cols-4 md:gap-10">
                {dataProduct?.length == 0 ? (
                    <LoadingImage />
                ) : (
                    dataProduct?.map((data, index) => (
                        <div key={index}>

                            <div className="group/item relative cursor-pointer" onClick={() => handleNavigateProductDetail(data)}>
                                <div className="lg:h-[268px] overflow-hidden">
                                    
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

                                {data?.onSale && <div className="absolute top-2 left-2 bg-primary text-white font-bold w-[50px] h-[50px] text-center leading-[50px] rounded-[50%]">
                                    {data.onSale}
                                </div>}

                                {data?.ribbonSale && (
                                    <div className="absolute top-0 right-0 block overflow-hidden w-[var(--width-box-deal)] h-[var(--width-box-deal)] md:w-[var(--width-box-deal-md)] md:h-[var(--width-box-deal-md)]">
                                        <div className="absolute text-sm top-[15px] left-[-2px] w-[var(--width-deal)] shadow-[#b8b8b8] shadow-md text-center rotate-[45deg] bg-primary text-white font-semibold md:w-[var(--width-deal-md)] md:top-[16px] md:left-[1px] md:text-base lg:text-lg">
                                            {data.ribbonSale}
                                        </div>
                                    </div>
                                )}

                                <p className="text-center font-semibold text-[#505050] md:text-[18px] hover:text-[#23527c] cursor-pointer">
                                    {data?.title}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 md:flex md:flex-col md:gap-0 lg:flex lg:flex-row justify-center items-center mt-2 lg:gap-2 text-center">
                                
                                {data?.price ?
                                    <>
                                        
                                        <div className="text-[15px] font-bold text-[#ce1111] md:text-[18px]">
                                        {changePriceToString(data?.price)}
                                        </div>
                                        {data?.priceDel && (
                                            <div className="text-[14px] font-semibold line-through text-[#adadad] md:text-[16px]">
                                                {changePriceToString(data.priceDel)}
                                            </div>
                                        )}
                                    </>
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

export default ProductMain;
