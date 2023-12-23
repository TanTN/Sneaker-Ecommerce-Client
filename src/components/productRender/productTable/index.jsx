import { changePriceToString } from '@/utils/helpers';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { AiFillCloseSquare } from 'react-icons/ai';

// table product được sử dụng trong page cart trên pc và page admin

const ProductTable = ({ cart, handleFixProduct, deleteProduct, isVisible }) => {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">

                {/* hàng tiêu đề */}
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

                {/* các hàng sản phẩm */}
                {cart?.map((elm, index) => {
                    const totalPrice = elm?.product?.price * +elm?.quantity;

                    return (
                        <TableBody key={index}>
                            <TableRow>

                                {/* xóa sản phẩm, ẩn khi ở trang admin */}
                                {!isVisible && (
                                    <TableCell>
                                        <AiFillCloseSquare
                                            className="text-[20px] lg:hover:text-primary lg:hover:cursor-pointer"
                                            onClick={() => deleteProduct(elm?._id)}
                                        />
                                    </TableCell>
                                )}
                                
                                {/* hình ảnh sản phẩm */}
                                <TableCell>
                                    <img
                                        src={elm?.product?.images[0]?.path}
                                        alt="product"
                                        className="w-[110px] h-[80px]"
                                    />
                                </TableCell>

                                {/* tên sản phẩm */}
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

                                {/* giá sản phẩm */}
                                <TableCell align="left">{changePriceToString(elm?.product?.price)}</TableCell>

                                {/* số lượng sản phẩm thêm vào */}
                                <TableCell align="left">{elm?.quantity}</TableCell>

                                {/* size sản phaảm */}
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
