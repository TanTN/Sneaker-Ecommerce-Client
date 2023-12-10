import {  changePriceToString } from '@/utils/helpres';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { AiFillCloseSquare } from 'react-icons/ai';

// table product for the cart page on mobile and user admin page

const ProductTable = ({ cart, handleFixProduct, deleteProduct, isVisible }) => {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow cx={{ padding: '10px' }}>
                        {!isVisible && <TableCell></TableCell>}
                        <TableCell></TableCell>
                        <TableCell align="left" style={{ fontWeight: 'bolder', fontSize: '16px', padding: '10px' }}>
                            Sản phẩm
                        </TableCell>
                        <TableCell align="left" style={{ fontWeight: 'bolder', fontSize: '16px' }}>
                            Giá
                        </TableCell>
                        <TableCell align="left" style={{ fontWeight: 'bolder', fontSize: '16px' }}>
                            Số lượng
                        </TableCell>
                        <TableCell align="left" style={{ fontWeight: 'bolder', fontSize: '16px' }}>
                            Size
                        </TableCell>
                        {!isVisible && (
                            <TableCell align="left" style={{ fontWeight: 'bolder', fontSize: '16px' }}>
                                Tạm tính
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                {cart?.map((elm, index) => {
                    const totalPrice = (elm?.product?.price) * +elm?.quantity;

                    return (
                        <TableBody key={index}>
                            <TableRow>
                                {!isVisible && (
                                    <TableCell>
                                        <AiFillCloseSquare
                                            className="text-[20px] lg:hover:text-primary lg:hover:cursor-pointer"
                                            onClick={() => deleteProduct(elm?._id)}
                                        />
                                    </TableCell>
                                )}

                                <TableCell>
                                    <img src={elm?.product?.images[0]?.path} alt="product" className="w-[110px] h-[80px]" />
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className="cursor-pointer hover:text-[#2e746b9f]"
                                    style={{ padding: '10px' }}
                                    onClick={() => {
                                        if (!isVisible) handleFixProduct(elm);
                                    }}
                                >
                                    {elm?.product?.title}
                                </TableCell>
                                <TableCell align="left">{changePriceToString(elm?.product?.price)}</TableCell>
                                <TableCell align="left">{elm?.quantity}</TableCell>
                                <TableCell align="left">{elm?.size}</TableCell>
                                {!isVisible && <TableCell align="left">{changePriceToString(totalPrice)}</TableCell>}
                            </TableRow>
                        </TableBody>
                    );
                })}
            </Table>
        </TableContainer>
    );
};

export default ProductTable;
