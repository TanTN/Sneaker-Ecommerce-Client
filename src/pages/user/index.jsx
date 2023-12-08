import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { Steps } from 'antd';

import { RiSmartphoneFill } from 'react-icons/ri';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';

import { fetchingUser, } from '@/store/reducerStore';
import { deleteOrder, getOrder, updateAvatar } from '@/api';
import ProductTable from '@/components/productRender/productTable';
import Button from '@/components/button';

const User = () => {
    const userCurrent = useSelector((state) => state.store.userCurrent);

    const dispatch = useDispatch();

    const [isRoomAvatar, setIsRoomAvatar] = useState(false);
    const [avatar, setAvatar] = useState({
        file: null,
        link: userCurrent?.avatar?.path,
    });
    const [productOrder, setProductOrder] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        return () => URL.revokeObjectURL(avatar.link);
    }, [avatar.link]);

    const fetchingOrder = async () => {
        const res = await getOrder(userCurrent.accessToken)
        if (res.success) {
            setProductOrder(res.order)
        }
    }
    useEffect(() => {
        fetchingOrder()
    }, [])
    
    const handleViewAvatar = (e) => {
        const file = e.target.files[0];
        if (file) setAvatar(() => ({ file, link: URL.createObjectURL(file) }));
    };

    const handleChangeAvatar = async() => {

        const formData = await new FormData();
        await formData.append('avatar', avatar.file);
        if (userCurrent.avatar.filename) {
            await formData.append('filename', userCurrent.avatar.filename);
        }
        await updateAvatar(userCurrent.accessToken, formData);
        await dispatch(fetchingUser(userCurrent.accessToken))
    };

    const handelDeleteOrder = async (oid) => { 
        await deleteOrder(userCurrent.accessToken,oid)
        await fetchingOrder()
    }

    return (
        <>
            {/* zoom avatar */}
            {isRoomAvatar && avatar.link && (
                <div className="flex justify-center items-center fixed z-[200] top-0 left-0 bottom-0 right-0 m-auto">
                    <div
                        className="absolute z-[-1] top-0 left-0 bottom-0 right-0 bg-[#141414e0]"
                        onClick={() => {
                            setIsRoomAvatar(false);
                        }}
                    />
                    <div className="relative min-w-[100%] h-[70%] md:min-w-[800px] md:h-[90%]">
                        <img src={avatar.link} className="w-[100%] h-[100%] object-cover" />
                        <div
                            className="absolute flex justify-center items-center top-[2%] right-[2%] bg-black text-[15px] md:text-[25px] lg:hover:bg-primary lg:hover:cursor-pointer"
                            onClick={() => setIsRoomAvatar(false)}
                        >
                            <IoIosClose color="white" />
                        </div>
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-[1140px] mt-[94px] lg:mt-0">

                <div className="flex items-center bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                    <AiOutlineHome className="hover:text-[#030303]" />
                    <Link
                        to="/"
                        className="pl-2 text-[#585858] hover:text-[#000000] cursor-pointer text-sm md:text-base"
                    >
                        Trang chủ
                    </Link>
                    <span>&nbsp; / &nbsp;</span>
                    <span>Trang cá nhân</span>
                </div>

                <section className="grid grid-cols-6 md:mx-[20px] lg:mx-0 my-[30px] lg:my-[70px] max-w-[1140px]">
                    
                    {/* content left */}
                    <div className="hidden md:block col-span-2 border-r-[1px] border-[#ddd]">
                        <h2>TRANG TÀI KHOẢN</h2>
                        <p className="my-2 text-lg">Xin chào, {userCurrent.name}!</p>
                    </div>

                    {/* content right */}
                    <div className="flex flex-col gap-[20px] col-span-6 px-[10px] md:col-span-4 md:pl-[40px]">
                        <h2>TÀI KHOẢN</h2>

                        <Avatar
                            src={avatar.link}
                            className={`${avatar.link && 'cursor-pointer'} relative border-[1px] border-[#a02222]`}
                            sx={{ height: 55, width: 55, fontSize: 26, fontWeight: 'lag' }}
                            alt={userCurrent.username}
                            onClick={() => {
                                if (avatar.link) setIsRoomAvatar(true);
                            }}
                        >
                            {userCurrent.name[0].toUpperCase()}
                        </Avatar>

                        <div className="flex">
                            <label
                                htmlFor="inputAvt"
                                className="px-[8px] py-[2px] text-[14px] border-[1px] border-black text-black rounded-[5px] cursor-pointer hover:bg-black hover:text-white transition mr-2"
                            >
                                Thay Avatar
                            </label>

                            <input type="file" id="inputAvt" onChange={handleViewAvatar} hidden />

                            <button
                                className="px-[8px] py-[2px] text-[14px] bg-primary border-[1px] border-primary hover:hover-primary text-white rounded-[5px] transition"
                                onClick={handleChangeAvatar}
                            >
                                Lưu ảnh
                            </button>

                        </div>

                        <p className="text-[18px]">
                            Tên tài khoản: <span className="font-medium">{userCurrent.name}</span>!
                        </p>

                        <div className="flex items-center">
                            <AiFillHome />
                            <p className="px-1 text-[18px]">Địa chỉ: {!userCurrent.address.province.label ? `Vietnam` : `${userCurrent.address.ward.label} - ${userCurrent.address.district.label} - ${userCurrent.address.province.label}`}</p>
                        </div>

                        <div className="flex items-center">
                            <RiSmartphoneFill />
                            <p className="px-1 text-[18px]">Điện thoại: {userCurrent.mobile}</p>
                        </div>

                        <h2>ĐƠN HÀNG CỦA BẠN:</h2>
                        {productOrder?.map((products,index) => 
                        {
                            const steps = ["Finished","In Progress",'Waiting']
                            const stepCurrent = steps.findIndex((step) => step == products.status)
                            return (
                                <div className='border-[1px] border-dashed border-primary p-[10px]'>
                                    <p className='text-[18px]'>Đơn hàng số {index + 1}: <Button className="bg-primary text-white mx-4" onClick={() => handelDeleteOrder(products._id)}>Hủy đơn hàng</Button></p>
                                    <ProductTable cart={products.product} isVisible />
                                    <div className='mt-[15px]'>
                                        <Steps
                                            current={stepCurrent}
                                            items={[
                                                {
                                                    title: 'Finished',
                                                    description:"Shop đang chuẩn bị hàng.",
                                                },
                                                {
                                                    title: 'In Progress',
                                                    description:"Đơn hàng đang được vận chuyển.",
                                                    subTitle: '24:00:00',
                                                },
                                                {
                                                    title: 'Waiting',
                                                    description:"Đơn hàng đang tren đường giao tới bạn.",
                                                },
                                            ]} />
                                    </div>
                                </div>)
                        })}
                        
                        
                    </div>
                </section>
            </div>
        </>
    );
};

export default User;
