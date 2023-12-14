import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AiOutlineHome } from 'react-icons/ai';
import { CiMenuFries } from 'react-icons/ci';

import ProductInMain from '@/components/productRender/productMain';
import {  getProducts } from '@/api';

const CreateProductInAdmin = () => {
    const { nameCategory } = useParams();

    const [allProducts, setAllProducts] = useState([])

    const [dataProduct, setDataProduct] = useState([]);

    const fetchingProduct = async () => {
        const res = await getProducts()
        if (res.success) {
            setAllProducts(res.products)
        }
    }
    useEffect(() => {
        fetchingProduct()
    }, [])
    
    useEffect(() => {
        const dataCategory = allProducts?.filter(product => product.category === nameCategory)
        setDataProduct(dataCategory)
    },[nameCategory,allProducts])


    return (
        <>
            <div className="flex items-center lg:bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                {/* message */}
                <div className="text-[14px]">
                    <ToastContainer />
                </div>

                <AiOutlineHome className="hover:text-[#030303]" />
                <Link to="/" className="px-2 text-[#585858] hover:text-[#000000] text-sm md:text-base cursor-pointer">
                    Trang chủ
                </Link>
                <span>/</span>
                <span className="pl-2 text-[#585858]">{`${nameCategory}`}</span>
            </div>

            <div className="flex items-center gap-1 mt-[30px]">
                <CiMenuFries size={15} />
                <h3>{nameCategory}</h3>
            </div>

            {/* render product */}
                <ProductInMain dataProduct={dataProduct} category />
        </>
    );
};

export default CreateProductInAdmin;
