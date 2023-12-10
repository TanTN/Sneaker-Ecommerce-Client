import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';

import { BiCategoryAlt } from 'react-icons/bi';
import { IoIosCreate } from 'react-icons/io';
import { IoCaretUpSharp, IoCaretDownSharp } from 'react-icons/io5';
import { FiUsers } from 'react-icons/fi';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { getCategory, getUsers } from '@/api';

const LayoutAdmin = ({ children }) => {
    const dispatch = useDispatch();
    const userCurrent = useSelector((state) => state.store.userCurrent);

    const [isShowCategory, setIsShowCategory] = useState(false);
    const [isShowAllUser, setIsShowAllUser] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [listUser, setListUser] = useState([]);


    useEffect(() => {
        const fetchingCategory = async () => {
            const res = await getCategory(userCurrent.accessToken)
            if (res.success) {
                setListCategory(res.category)
            }
        }
        const fetchingUsers = async () => {
            const res = await getUsers(userCurrent.accessToken)
            if (res.success) {
                setListUser(res.users)
            }
        }
        fetchingUsers()
        fetchingCategory()
    },[])

    return (
        <div>
            <Navbar layoutAdmin />

            <div className="max-w-[1140px] mx-auto">
                <div className="grid grid-cols-4 gap-10">

                    {/* leftbar */}
                    <div className="flex flex-col gap-[20px] col-span-1 p-[20px] min-h-[var(--width-leftBar)] bg-[#f5f5f59d]">

                        {/* create product */}
                        <NavLink
                            to="/admin/createProduct"
                            className={({ isActive }) =>
                                `flex gap-[5px] items-center text-[16px] p-3 ${
                                    isActive && 'font-medium bg-white rounded-[8px] drop-shadow-ShadowRoot'
                                }`
                            }
                        >
                            <IoIosCreate />
                            <span>Create product</span>
                        </NavLink>

                        {/* Category */}
                        <div>
                            <div
                                className="flex justify-between items-center mx-2  cursor-pointer"
                                onClick={() => setIsShowCategory(!isShowCategory)}
                            >
                                <div className="flex gap-[5px] items-center text-[16px]">
                                    <BiCategoryAlt />
                                    <span>Category</span>
                                </div>
                                {!isShowCategory ? <IoCaretUpSharp /> : <IoCaretDownSharp />}
                            </div>
                            {isShowCategory && (
                                <div className="flex flex-col gap-2 ml-[20px]">
                                    {listCategory?.map((category) => (
                                        <NavLink
                                            key={category._id}
                                            to={`/admin/category/${category.title}`}
                                            className={({ isActive }) => {
                                                return `p-2 text-[14px] ${
                                                    isActive &&
                                                    'font-medium text-black bg-white rounded-[8px] drop-shadow-ShadowRoot'
                                                }`;
                                        }}
                                        >
                                            Giày {category.title}
                                        </NavLink>
                                    )
                                    )}
                                </div>
                            )}
                        </div>

                        {/* All user */}
                        <div>

                            <div
                                className="flex justify-between items-center mx-2 cursor-pointer"
                                onClick={() => setIsShowAllUser(!isShowAllUser)}
                            >
                                <div className="flex gap-[5px] items-center text-[16px]">
                                    <FiUsers />
                                    <span>All user</span>
                                </div>
                                {!isShowAllUser ? <IoCaretUpSharp /> : <IoCaretDownSharp />}
                            </div>

                            {isShowAllUser && (
                                <div className="flex flex-col gap-2 ml-[20px]">
                                    {listUser?.map((user) => (
                                        <NavLink
                                            to={`/admin/user/${user.id}`}
                                            key={user.id}
                                            className={({ isActive }) => {
                                                return `flex gap-2 items-center p-2 text-[#929292]${
                                                    isActive &&
                                                    'text-sm font-medium text-black bg-white rounded-[8px] drop-shadow-ShadowRoot'
                                                }`;
                                            }}
                                        >
                                            <Avatar
                                                alt={user?.name}
                                                src={user?.avatar?.path}
                                                sx={{
                                                    width: 25,
                                                    height: 25,
                                                    fontSize: 16,
                                                    fontWeight: 'lag',
                                                }}
                                            >
                                            </Avatar>
                                            <span className="text-[14px] hover:text-primary">{user.name}</span>
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* content */}
                    <div className="col-span-3">{children}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LayoutAdmin;
