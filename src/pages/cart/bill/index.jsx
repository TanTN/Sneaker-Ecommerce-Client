import { useNavigate } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';


import Button from '@/components/button';
import { changePriceToString } from '@/utils/helpres';

const Bill = ({ userCurrent,cart }) => {
    const navigate = useNavigate();

    const totalProduct = userCurrent?.cart?.reduce((acc,cur) => acc + cur.quantity,0);

    let price;

    const totalPrice = cart?.reduce((acc,cur) => {
        return (cur?.product?.price) * cur?.quantity + acc
    }, 0)

    if (totalProduct <= 1) {
        
        price = totalPrice + 30;
    } else {
        price = totalPrice;
    }

    return (
        <>
            <TableContainer>
                <Table>
                    <TableBody>

                        <TableRow>
                            <TableCell component="th" scope="row" align="left" sx={{ width: '130px' }}>
                                <p className="font-semibold text-[16px]">Tạm tính :</p>
                            </TableCell>

                            <TableCell>
                                {totalProduct <= 1 ? changePriceToString(price - 30) : changePriceToString(price)}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">
                                <p className="font-semibold text-[16px]">Giao hàng :</p>
                            </TableCell>

                            <TableCell align="left">
                                {totalProduct <= 1 ? (
                                    <p>
                                        Giao hàng:{' '}
                                        <span className="font-semibold">
                                            30.000 <span className="underline">đ</span>
                                        </span>
                                    </p>
                                ) : (
                                    <p>Giao hàng miễn phí</p>
                                )}
                                <p>Tùy chọn giao hàng sẽ được cập nhật trong quá trình thanh toán.</p>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">
                                <p className="font-semibold text-[16px]">Tổng</p>
                            </TableCell>

                            <TableCell align="left">
                                <p className="font-semibold text-[16px]">
                                    {changePriceToString(price)}
                                </p>
                            </TableCell>
                        </TableRow>
                        
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                className="w-[100%] bg-primary text-white p-2 text-[18px] hover:hover-primary"
                onClick={() => navigate('/buy')}
            >
                TIẾN HÀNH THANH TOÁN
            </Button>
        </>
    );
};

export default Bill;
