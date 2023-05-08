

import React from 'react'
import { dataSneaker } from '../../../data/dataSneaker'

const ProductHot = () => {
  return (
    <div className='mb-[50px] overflow-hidden md:mb-[70px]'>
        <h1 className='text-center mb-[20px] md:mb-[40px]'>SẢN PHẨM BÁN CHẠY</h1>
        <div className='grid gap-5 grid-cols-2 md:grid-cols-4 md:gap-10'>
            {dataSneaker.map((data,index) => 
                <div key={index}>
                    <div className='group/item relative overflow-hidden cursor-pointer'>
                        <div className='md:py-4'>
                            <div className='group/edit mx-[-13px] md:mx-[-38px] md:visible md:group-hover/item:invisible'>
                                <img src={data.img} alt="product1" />
                            </div>
                            <div className='group/edit invisible md:group-hover/item:visible md:overflow-hidden absolute left-0 top-0 right-0'>
                                <img width={'100%'} className='md:group-hover/item:animate-fadeIn' src={data.imgHover} alt="product" />
                            </div>
                            <div className='absolute top-0 left-2 bg-primary text-white font-bold w-[50px] h-[50px] text-center leading-[50px] rounded-[50%]'>
                                {data.percent}
                            </div>
                            {data.isDeal && (
                                <div className='absolute top-[18px] left-[67px] shadow-[#b8b8b8] shadow-md text-center rotate-[45deg] bg-primary text-white font-semibold w-[150px] md:text-lg md:top-[26px] md:left-[146px]'>
                                    Deal Sốc
                                </div>
                            )}
                        </div>
                        <p className='text-center font-semibold text-[#505050] md:text-[18px] cursor-pointer'>{data.name}</p>
                    </div>
                    <div className='pt-2 text-center'>
                        <span className='text-[15px] font-bold text-[#ce1111] md:text-[18px]'>{data.price}<span className='underline'>đ</span></span>
                        <span className='text-[14px] pl-2 font-semibold line-through text-[#adadad] md:text-[16px] md:pl-5'>{data.priceDropped}<span className='underline'>đ</span></span>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default ProductHot