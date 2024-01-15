import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';

import { AiOutlineHome } from 'react-icons/ai';

import WrapperBill from '@/components/popper/WrapperBill';
import Button from '@/components/button';
import { createProduct, getCategory } from '@/api';
import { useDispatch, useSelector } from 'react-redux';


const CreateProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userCurrent = useSelector(state => state.store.userCurrent)

    const [file, setFile] = useState();
    const [urlImage, setUrlImage] = useState();
    const [listCategory, setListCategory] = useState([]);
    const [nameProduct, setNameProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');

    useEffect(() => {
        const fetchingCategory = async () => {
            const res = await getCategory(userCurrent.accessToken,dispatch,navigate);
            if (res.success) {
                setListCategory(res.category)
            }
        }
        fetchingCategory()
    }, [])

    useEffect(() => {
        return () => {
            if (file) URL.revokeObjectURL(file)
            if (urlImage) URL.revokeObjectURL(urlImage)
        }
    },[file,urlImage])

    const handleNameProduct = (e) => {
        setNameProduct(e.target.value);
    };

    const handleBrand = (e) => {
        setBrand(e.target.value);
    };

    const handlePriceProduct = (e) => {
        setPriceProduct(e.target.value);
    };
    const handleImage = (e) => { 
        const imageFile = e.target.files[0];
        const urlImage = URL.createObjectURL(imageFile)
        setUrlImage(urlImage)
        setFile(imageFile)
    }

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !nameProduct || !priceProduct || !category || !brand || !file) {
            return;
        }

        const formData = new FormData();
        formData.append('title', nameProduct);
        formData.append('slug', nameProduct);
        formData.append('price', priceProduct);
        formData.append('brand', brand);
        formData.append('category', category);
        formData.append('images', file);
        const res = await createProduct(userCurrent.accessToken, formData,dispatch,navigate)
        if (res.success) { 
            toast.success(res.message, { theme: "colored" })
            setBrand("");
            setNameProduct("")
            setPriceProduct("")
            setUrlImage("")
            setFile("")
            setCategory("")
        }

    };

    return (
        <>
            <div className="flex items-center lg:bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                {/* message */}

                <AiOutlineHome className="hover:text-[#030303]" />

                <Link to="/" className="px-2 text-[#585858] hover:text-[#000000] text-sm md:text-base cursor-pointer">
                    Trang chủ
                </Link>

                <span>/</span>
                <span className="pl-2 text-[#585858]">Tạo sản phẩm</span>
            </div>

            <h3 className="mt-[30px]">Tạo sản phẩm :</h3>
            <WrapperBill className="md:mb-[50px] md:mt-[20px]">

                <form className="flex flex-col gap-10">

                    <div className="flex flex-col">
                        <label htmlFor="nameProduct">Tên sản phẩm :</label>
                        <Input id="nameProduct" value={nameProduct} className="p-0" onChange={handleNameProduct} />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="price">Giá :</label>
                        <Input id="price" value={priceProduct} className="p-0" onChange={handlePriceProduct} />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="brand">Brand :</label>
                        <Input id="brand" value={brand} className="p-0" onChange={handleBrand} />
                    </div>

                    <FormControl variant="filled" className="w-[300px]">
                        <InputLabel id="category" className="text-xl">
                            Category :
                        </InputLabel>
                        <Select labelId="category" label="Adidas" value={category} onChange={handleChangeCategory}>
                            {listCategory?.map((elm) => <MenuItem key={elm?._id} value={elm?.title}>{elm?.title}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <div>
                        <input type="file" id="image" hidden onChange={handleImage} />
                        <label
                            htmlFor="image"
                            className="p-1 bg-white text-black border-[1px] border-black rounded-[4px] cursor-pointer hover:bg-black hover:text-white transition "
                        >
                            Thêm ảnh
                        </label>
                    </div>

                    {file && <img src={urlImage} alt="" className="w-[255px] h-[268px]" />}

                    <div>
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            className="inline-block bg-primary text-white font-medium hover-primary     "
                        >
                            Lưu
                        </Button>
                    </div>
                </form>
            </WrapperBill>
        </>
    );
};

export default CreateProduct;
