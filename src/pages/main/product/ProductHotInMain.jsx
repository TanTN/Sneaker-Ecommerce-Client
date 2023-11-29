import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AiFillCaretDown } from "react-icons/ai";

import Button from '@/components/button';
import ProductHot from '@/components/productRender/productMain';

const ProductHotInMain = ({ data }) => {
    const title = 'SẢN PHẨM BÁN CHẠY';
    const [dataProduct, setSataProduct] = useState([])
    useEffect(() => {
        const dataProduct = data.slice(0, 12);
        setSataProduct(dataProduct)
        
    },[data])

    return <ProductHot dataProduct={dataProduct} title={title}/>;
};

export default ProductHotInMain;
