import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';

import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';

import Nike from './product/Nike';
import Adidas from './product/Adidas';
import Mlb from './product/Mlb';
import Personal from './product/Personal';
import Tips from './product/Tips';
import Luxury from './product/Luxury';
import {imagesPoster} from '@/utils/constants';
import BestSell from './product/bestSell';
import {getProducts} from "@/api"
import { fetchingUser } from '@/store/reducerStore';
import { useNavigate } from 'react-router';


const Home = () => {
    const isMobile = useSelector((state) => state.store.isMobile);
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isLogin = useSelector((state) => state.store.isLogin);
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const [dataProduct , setDataProduct] = useState([])
    
    useEffect(() => {
        window.scrollTo(0,0);

        if (isLogin) {
            const getUserCurrent = async () => {
                await dispatch(fetchingUser({accessToken:userCurrent.accessToken,dispatch,navigate}))
            }
            getUserCurrent()
        }
    }, [])

    useEffect(() => {
        const fetchingDataProduct = async () => {
            const data = await getProducts()
            if (data.success) {
                await setDataProduct(data.products)
            }
        }
        fetchingDataProduct()
    },[])


    // cấu hình button slider previous
    const SamplePrevArrow = ({ onClick }) => {
        return (
            <div
                className="blog hidden absolute justify-center items-center rounded-sm w-[40px] h-[40px] bottom-[5%] right-[10%] z-20 text-white bg-[#0808088c] cursor-pointer"
                onClick={onClick}
            >
                <HiOutlineChevronLeft className="text-white text-2xl" />
            </div>
        );
    };

    // cấu hình button slider next
    const SampleNextArrow = ({ onClick }) => {
        return (
            <div
                className="blog hidden absolute justify-center items-center rounded-sm w-[40px] h-[40px] bottom-[5%] right-[5%] z-20 text-white bg-[#0808088c] cursor-pointer"
                onClick={onClick}
            >
                <HiOutlineChevronRight className="text-white text-2xl" />
            </div>
        );
    };

    // cấu hình slider
    const options = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinity: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: !isMobile && true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
    };
    
    return (
        <div className="mt-[94px] max-w-[1140px] mx-auto md:mt-[90px] lg:mt-0">
            {/* slider picture trong header */}
            <div className="pb-[30px] px-[15px] lg:px-0 md:pb-[40px]">
                <div className="slide-slick">
                    <Slider {...options}>
                        {imagesPoster.map((img, index) => (
                            <img key={index} src={img} alt="shop" />
                        ))}
                    </Slider>
                </div>
            </div>

            {/* body */}
            <div className="px-[15px] lg:px-0">
                <BestSell data={dataProduct} />
                <Nike data={dataProduct}/>
                <Adidas data={dataProduct}/>
                <Mlb data={dataProduct}/>
                <Luxury data={dataProduct}/>
                <Personal />
            </div>
            <Tips />
        </div>
    );
};

export default memo(Home);
