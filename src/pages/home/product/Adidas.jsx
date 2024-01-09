import React, { useEffect, useState } from 'react';

import ProductHome from '@/components/productRender/productHome';


const Adidas = ({data}) => {

    const brands = ["ULTRABOOST 22","YEEZY 350 V2","YEEZY FOAM RUNNER","YEEZY SLIDE"]
    const brandHome = "ADIDAS"

    const [dataProduct, setDataProduct] = useState([]);
    const [dataOnBrandHome, setDataOnBrandHome] = useState([])

    const [brandActive, setBrandActive] = useState(brands[0])

    useEffect(() => {
        const dataFilter = data.filter(product => product.category === brandHome)
        setDataOnBrandHome(dataFilter)
    }, [data])

    useEffect(() => {
            const dataFilter = dataOnBrandHome.filter(product => {
                return product.brand.toUpperCase() == brandActive
            })
            setDataProduct(dataFilter)
        
    }, [brandActive, data, dataOnBrandHome]);
    
    const handleActiveBrand = (brand) => {
        setBrandActive(brand)
    }

    return (
        <div className="overflow-hidden mb-[50px] md:mb-[70px]">
            
            <h2 className="text-center mb-[8px] md:mb-[20px]">GIÀY ADIDAS</h2>

            {/* list brand */}
            <div className="flex gap-x-2 flex-wrap justify-center items-center font-semibold md:text-base md:px-6 pb-[15px]">
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
            
            {/* render sản phẩm */}
            <ProductHome dataProduct={dataProduct} />

        </div>
    );
};

export default Adidas;
