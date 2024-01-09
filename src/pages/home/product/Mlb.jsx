import React, { useEffect, useState } from 'react';

import ProductHome from '@/components/productRender/productHome';

const Mlb = ({data}) => {
    const [dataProduct, setDataProduct] = useState([]);
    const brandActive = "GIÀY MLB"

    useEffect(() => {
        const dataFilter = data.filter(product => product.brand.toUpperCase() == brandActive)
        setDataProduct(dataFilter)
    }, [data]);

    return (
        <div className="overflow-hidden mb-[50px] md:mb-[70px]">
            <h2 className="text-center mb-[8px] md:mb-[20px]">GIÀY MLB</h2>
            <div className="text-center font-semibold text-base pb-[15px]">
                <span className="border-b-[1px] border-[#ce1111] text-[#ce1111] cursor-pointer">{brandActive}</span>
            </div>

                <ProductHome dataProduct={dataProduct} />

        </div>
    );
};

export default Mlb;
