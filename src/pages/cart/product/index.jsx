import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { fetchingUser } from '@/store/reducerStore';
import ProductTable from '@/components/productRender/productTable';
import { deleteProductToCart } from '@/api';

const ProductCartPage = ({ cart ,userCurrent}) => {

    const isLogin = useSelector((state) => state.store.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFixProduct = (productFix) => {
        navigate(`/cart/${productFix?.product?.slug}`);
    };
    const deleteProduct = async (pid) => {
        await deleteProductToCart(userCurrent.accessToken, pid)
        await dispatch(fetchingUser(userCurrent.accessToken))
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
