import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { deleteProductToCartNoLogin, fetchingUser, setIdProductToCart } from '@/store/reducerStore';
import ProductTable from '@/components/productRender/productTable';
import { deleteProductToCart } from '@/api';

const ProductCartPage = ({ cart ,userCurrent}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLogin  = useSelector(state =>  state.store.isLogin)

    const handleFixProduct = (productFix) => {
        navigate(`/cart/${productFix?.product?.slug}`);
        dispatch(setIdProductToCart(productFix._id))
    };
    
    const deleteProduct = async (pid) => {
        if (isLogin) {
            await deleteProductToCart(userCurrent.accessToken, pid)
            await dispatch(fetchingUser(userCurrent.accessToken))
        } else {
            dispatch(deleteProductToCartNoLogin(pid))
        }
    };

    return (
        <ProductTable
            cart={cart}
            handleFixProduct={handleFixProduct}
            deleteProduct={deleteProduct}
        />
    );
};

export default ProductCartPage;
