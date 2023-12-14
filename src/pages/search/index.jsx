import React, { useEffect, useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ProductMain from '@/components/productRender/productMain';
import { getProductFilter, getProductSearch } from '@/api';
import Slider from '@mui/material/Slider';
import Button from '@/components/button';
import { changePriceToString } from '@/utils/helpers';
import { MdKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { Alert, Space } from 'antd';
import { useSelector } from 'react-redux';

const Search = () => {
    const { param } = useParams();
    const doSearch = useSelector(state => state.store.doSearch)

    const [priceLinear, setPriceLinear] = useState('');
    const [product, setProduct] = useState([]);
    const [staticValueRange, setStaticValueRange] = useState([0, 0]);
    const [valueRange, setValueRange] = useState([0, 0]);
    const [countProduct, setCountProduct] = useState(0);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [searchFalse, setSearchFalse] = useState('');

    const handleFilterPriceLinear = (e) => {
        setPriceLinear(e.target.value);
        fetchingFilterProduct(e.target.value, { 'price[gte]': valueRange[0], 'price[lte]': valueRange[1] }, 1);
        setPageCurrent(1);
    };
    const handleFilterPriceRange = () => {
        fetchingFilterProduct(priceLinear, { 'price[gte]': valueRange[0], 'price[lte]': valueRange[1] }, 1);
        setPageCurrent(1);
    };

    const handlePreviousPage = () => {
        if (pageCurrent > 1) {
            fetchingFilterProduct(
                priceLinear,
                { 'price[gte]': valueRange[0], 'price[lte]': valueRange[1] },
                pageCurrent - 1,
            );
            setPageCurrent(pageCurrent - 1);
        }
    };

    const handleNextPage = () => {
        if (pageCurrent < countProduct) {
            fetchingFilterProduct(
                priceLinear,
                { 'price[gte]': valueRange[0], 'price[lte]': valueRange[1] },
                pageCurrent + 1,
            );
            setPageCurrent(pageCurrent + 1);
        }
    };
    const fetchingFilterProduct = async (sort, price, page) => {
        const res = await getProductFilter({ title: param, limit: 12, page, sort, ...price });
        if (res.success) {
            setProduct(res.products);
            setCountProduct(Math.ceil(res.countProduct / 12));
            setSearchFalse("");
        } else {
            setSearchFalse(res.message);
        }
    };

    const handleChangePage = (page) => {
        setPageCurrent(page);
        fetchingFilterProduct(priceLinear, { 'price[gte]': valueRange[0], 'price[lte]': valueRange[1] }, page);
    };
    useEffect(() => {
        const fetchingProductSearch = async () => {
            const res = await getProductSearch({ title: param });
            if (res.success) {
                setProduct(res.products);
                setStaticValueRange([res.priceMin, res.priceMax]);
                setValueRange([res.priceMin, res.priceMax]);
                setCountProduct(Math.ceil(res.countProduct / 12));
                setSearchFalse("");
            } else {
                setSearchFalse(res.products);
            }
        };
        fetchingProductSearch();
    }, [param,doSearch]);

    const handleChangeRange = (event, newValue) => {
        setValueRange(newValue);
    };

    return (
        <>
            <div className="w-full text-[18px] text-white bg-black py-[15px] mb-[16px] text-center font-IBM">
                KẾT QUẢ TÌM KIẾM: {param}
            </div>

            <div className="max-w-[1170px] mx-auto">
                {!searchFalse ? (
                    <div className="flex gap-[20px]">
                        <div className="basis-[80%]">
                            <div className="flex mb-[35px]">
                                <div className="flex flex-1 items-center pl-4 py-2 mb-[10px]">
                                    <AiOutlineHome className="hover:text-[#030303]" />
                                    <Link
                                        to="/"
                                        className="pl-2 text-[#585858] hover:text-[#000000] cursor-pointer text-sm md:text-base"
                                    >
                                        Trang chủ
                                    </Link>
                                    <span>&nbsp; / &nbsp;</span>
                                    <span>Bạn tìm kiếm cho {param}</span>
                                </div>
                                <div className="">
                                    <FormControl variant="filled" className="w-[300px]">
                                        <InputLabel id="category" className="text-xl">
                                            Độ liên quan
                                        </InputLabel>
                                        <Select
                                            labelId="category"
                                            label="Adidas"
                                            value={priceLinear}
                                            onChange={handleFilterPriceLinear}
                                        >
                                            <MenuItem value="price">Thứ tự theo giá: thấp đến cao</MenuItem>
                                            <MenuItem value="-price">Thứ tự theo giá: cao đến thấp</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <ProductMain dataProduct={product} />
                            {countProduct > 1 && (
                                <div className="flex gap-3 justify-center items-center mb-[50px]">
                                    <div
                                        className={`${pageCurrent == 1 && 'text-text-l2'} cursor-pointer`}
                                        onClick={handlePreviousPage}
                                    >
                                        <MdOutlineKeyboardDoubleArrowLeft size={22} />
                                    </div>
                                    {Array(countProduct)
                                        .fill(0)
                                        .map((_, index) => (
                                            <Button
                                                key={index}
                                                className={`border-[#ccc] border-[1px] hover:bg-[#e7e7e7] ${
                                                    pageCurrent == index + 1 ? 'bg-[#e7e7e7]' : 'bg-[white]'
                                                }`}
                                                onClick={() => handleChangePage(index + 1)}
                                            >
                                                {index + 1}
                                            </Button>
                                        ))}
                                    <div
                                        className={`${pageCurrent == countProduct && 'text-text-l2'} cursor-pointer`}
                                        onClick={handleNextPage}
                                    >
                                        <MdKeyboardDoubleArrowRight size={22} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="basis-[20%]">
                            <div className="text-[25px] font-bold mb-[5px]">LỌC THEO GIÁ</div>
                            <div className="px-[15px]">
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
                                <Button
                                    className="text-white bg-black hover:bg-cyan mr-[5px]"
                                    onClick={handleFilterPriceRange}
                                >
                                    LỌC
                                </Button>
                                <span className="text-text-l2 text-[14px]">
                                    Giá {changePriceToString(valueRange[0])} - {changePriceToString(valueRange[1])}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='mb-[20px]'>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Alert message={searchFalse} type="info" />
                        </Space>
                    </div>
                )}
            </div>
        </>
    );
};

export default Search