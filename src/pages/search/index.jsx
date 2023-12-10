import React, { useEffect, useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ProductMain from '@/components/productRender/productMain';
import { getProductFilter } from '@/api';
import Slider from '@mui/material/Slider';
import Button from '@/components/button';
import {changePriceToString} from "@/utils/helpres"

const Search = () => {
    const { param } = useParams()
    const [priceLinear, setPriceLinear] = useState("price")
    const [product, setProduct] = useState([])
    const [valueRange, setValueRange] = useState([0,0]);
    const [staticValueRange, setStaticValueRange] = useState([0,0]);


    const handleFilterPriceLinear = (e) => {
        setPriceLinear(e.target.value)
        fetchingProduct(e.target.value)
    }
    const handleFilterPriceRange = () => {
        fetchingProduct(priceLinear,{"price[gte]": valueRange[0], "price[lte]": valueRange[1]})
    }

    const fetchingProduct = async (sort, price) => {
        const res = await getProductFilter({ title: param, sort, ...price })
        if (res.success) {
            setProduct(res.products)
            if (!sort && !price) { 
                setValueRange([res.min, res.max])
                setStaticValueRange([res.min, res.max])
            }
        }
    }
    useEffect(() => {
        fetchingProduct()
    }, [param])

    const handleChangeRange = (event, newValue) => {
        setValueRange(newValue);
    };

    return (
    <>
        <div className='w-full text-[18px] text-white bg-black py-[15px] mb-[16px] text-center font-IBM'>KẾT QUẢ TÌM KIẾM: {param}</div>
            <div className='max-w-[1170px] mx-auto'>
            <div className='flex gap-[20px]'>
                    <div className='basis-[80%]'>
                        <div className='flex mb-[35px]'>
                            <div className="flex flex-1 items-center pl-4 py-2 mb-[10px]">
                                <AiOutlineHome className="hover:text-[#030303]" />
                                <Link to="/" className="pl-2 text-[#585858] hover:text-[#000000] cursor-pointer text-sm md:text-base">
                                    Trang chủ
                                </Link>
                                <span>&nbsp; / &nbsp;</span>
                                    <span>Bạn tìm kiếm cho {param}</span>
                            </div>
                            <div className=''>
                                <FormControl variant="filled" className="w-[300px]">
                                    <InputLabel id="category" className="text-xl">
                                        Độ liên quan
                                    </InputLabel>
                                    <Select labelId="category" label="Adidas" value={priceLinear} onChange={handleFilterPriceLinear}>
                                    <MenuItem value="price">Thứ tự theo giá: thấp đến cao</MenuItem>
                                    <MenuItem value="-price">Thứ tự theo giá: cao đến thấp</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <ProductMain dataProduct={product} />
                    </div>
                    <div className='basis-[20%]'>
                        <div className='text-[25px] font-bold mb-[5px]'>LỌC THEO GIÁ</div>
                        <div className='px-[15px]'>
                            <Box>
                                <Slider
                                    value={valueRange}
                                    step={10000}
                                    min={staticValueRange[0]}
                                    max={staticValueRange[1]}
                                    onChange={handleChangeRange}
                                    getAriaLabel={() => 'Temperature range'}
                                />
                            </Box>
                        </div>
                        <div>
                            <Button className='text-white bg-black hover:bg-cyan mr-[10px]' onClick={handleFilterPriceRange}>LỌC</Button>
                            <span className='text-text-l2 text-[18px]'>Giá {changePriceToString(valueRange[0])} - {changePriceToString(valueRange[1])}</span>
                        </div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default Search