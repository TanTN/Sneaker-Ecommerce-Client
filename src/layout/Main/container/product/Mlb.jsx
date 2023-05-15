
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setProduct } from '../../../../redux/reducer'

const Mlb = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dataMlbs = useSelector(state => state.data.dataMlbs)

    const handleAddProduct = (data) => {
        dispatch(setProduct(data))
        navigate('/detailProduct')
        window.scrollTo(0, 0)
    }
  return (
    <div className='overflow-hidden mb-[50px] md:mb-[70px]'>
        <h1 className='text-center mb-[8px] md:mb-[20px] md:text-[30px]'>GIÀY MLB</h1>
        <div className='text-center font-semibold text-base md:pb-[15px] md:text-xl'>
            <span className='border-b-[1px] pb-u border-[#ce1111] text-[#ce1111]'>GIÀY MLB</span>
            
        </div>
        <div className='grid gap-5 grid-cols-2 pt-5 md:grid-cols-4 md:gap-10'>
            {dataMlbs.map((data,index) => 
                <div key={index}>
                    <div className='relative cursor-pointer' onClick={() => handleAddProduct(data)}>
                        <div className='mx-[-13px] md:mx-[-38px]'>
                            <img className='' src={data.img} alt="product" />
                        </div>
                        <div className='absolute top-0 left-2 bg-primary text-white font-bold w-[50px] h-[50px] text-center leading-[50px] rounded-[50%]'>
                            {data.percent}
                        </div>
                        <p className='text-center font-semibold cursor-pointer text-[#505050] md:text-[18px] hover:text-[#23527c]'>{data.name}</p>
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

export default Mlb