import React, { useEffect, useState } from 'react';

import ProductHome from '@/components/productRender/productHome';

const BestSell = ({ data }) => {
    const title = 'SẢN PHẨM BÁN CHẠY';
    const [dataProduct, setSataProduct] = useState([])
    useEffect(() => {
        const dataProduct = data.slice(0, 12);
        setSataProduct(dataProduct)
        
    },[data])

    return <ProductHome dataProduct={dataProduct} title={title}/>;
};

export default BestSell;
