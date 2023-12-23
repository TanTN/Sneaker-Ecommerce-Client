import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AiFillCloseSquare } from 'react-icons/ai';

import { deleteProductToCart } from '@/api';
import { deleteProductToCartNoLogin, fetchingUser } from '@/store/reducerStore';
import { changePriceToString } from '@/utils/helpers';


const ProductOrder = ({cart}) => {
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isLogin = useSelector((state) => state.store.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleDeleteProduct = async (cid) => {
        if (isLogin) {
            await deleteProductToCart(userCurrent.accessToken, cid,dispatch,navigate)
            await dispatch(fetchingUser({accessToken:userCurrent.accessToken,dispatch,navigate}))
        } else {
            dispatch(deleteProductToCartNoLogin(cid))
        }
    }

    return (
        <div className="">
            <p className="font-bold text-[20px] text-center py-3">Đơn hàng của bạn</p>
            
            <div>
                {cart?.map((elm, index) => (
                    <div key={index}>
                        <div className="grid grid-cols-4 gap-x-2 py-1 border-b-[1px] border-[#bebebe] pr-3 text-sm md:px-[40px] md:text-lg lg:text-base">
                            <div className="relative md:w-[130px] md:h-[100px]">
                                <img src={elm?.product?.images[0]?.path} alt="photo" className="w-[100%] h-[100%]" />
                                <div
                                    className="absolute top-[2%] left-[2%] cursor-pointer select-none "
                                    onClick={() => handleDeleteProduct(elm._id)}
                                >
                                    <AiFillCloseSquare className="text-[20px] lg:hover:text-primary" />
                                </div>
                            </div>
                            
                            <div className="col-span-3 my-auto">
                                <p>{elm.product.title}</p>
                                <div className="flex justify-between pt-2">
                                    <p>
                                        <span>SIZE: </span>
                                        <span>{elm.size}</span>
                                    </p>
                                    <p>
                                        <span>{elm.quantity}</span>
                                        <span className="mx-3">x</span>
                                        <span>
                                            {changePriceToString(elm.product.price)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductOrder;
