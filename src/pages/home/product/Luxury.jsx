import React, { useEffect, useState } from 'react';

import ProductHome from '@/components/productRender/productHome';

const Luxury = ({data}) => {
    const brands = ["GIÀY ALEXANDER MCQUEEN","GIÀY DIOR","GIÀY GUCCI","GIÀY LOUIS VUITTON"]

    const [dataProduct, setDataProduct] = useState([]);

    const [brandActive, setBrandActive] = useState(brands[0])

    const brandHome = "LUXURY"
    const [dataOnBrandHome, setDataOnBrandHome] = useState([])

    useEffect(() => {
        const dataFilter = data.filter(product => product.category === brandHome)
        setDataOnBrandHome(dataFilter)
    },[data])
    useEffect(() => {
        const dataFilter = dataOnBrandHome.filter(product => product.brand.toUpperCase() == brandActive)
        setDataProduct(dataFilter)
    }, [brandActive,data,dataOnBrandHome]);

    const handleActiveBrand = (brand) => {
        setBrandActive(brand)
    }


    return (
        <div className="overflow-hidden mb-[50px] md:mb-[70px]">
            <h2 className="text-center mb-[8px] md:mb-[20px]">LUXURY</h2>
            <div className="flex gap-x-2 flex-wrap justify-center items-center font-semibold text-base md:px-6 pb-[15px]">
            {brands.map((brand, index) => (
                    <div key={index} className='flex'>
                        {index > 0 && <span className='mr-[8px]'>/</span>}
                        <div className={`${brand == brandActive ? "border-b-[1px] border-[#ce1111] text-[#ce1111]" : "text-gray-400"} cursor-pointer`}
                            onClick={() => handleActiveBrand(brand)}
                        >
                            {brand}
                        </div>
                        
                    </div>
                ))}
            </div>

                <ProductHome dataProduct={dataProduct} />
            
        </div>
    );
};

export default Luxury;
