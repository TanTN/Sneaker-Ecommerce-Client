
// các cách chon giày (phần cuối body)
const dataTips = [
    {
        href:'https://shopgiayreplica.com/nhung-mau-giay-sneaker-bung-no-xu-huong-2021/',
        img:'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357461/image%20sneaker/top-giay-sneaker-hot-2021-rotated-350x235_hfwujb.jpg',
        content:'TOP 10++ MẪU GIÀY SNEAKER HOT NHẤT 2022 ĐÁNG SỞ HỮU',
        sub:'Hiện nay, người dùng đã không còn bị gò bó bởi những đôi giày tây, giày vải,… với những màu sắc nhàm chán. Thay vào đó là những thiết kế phá cách, trẻ trung trên những tone màu cực trending, bắt mắt. Trong bài viết này hãy cùng Shopgiayreplica.com ngắm trọn bộ top những đôi giày sneaker hot trend nhất năm 2022 mà nhất định bạn không được bỏ qua nhé!'
    },
    {
        href:'https://shopgiayreplica.com/cac-cach-phoi-do-voi-giay-nike-air-jordan-1/',
        img:'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357452/image%20sneaker/phoi-do-air-jordan-quan-short-nam-350x235_fcqfck.jpg',
        content:'Phối đồ cùng Nike Air Jordan 1 như thế nào để vừa sang vừa chất',
        sub:'Nike Air Jordan 1 từ lâu đã trở thành biểu tượng của phong cách thời trang đường phố và bùng nổ mạnh mẽ từ những năm đầu của thế kỷ XXI cho đến ngày nay.'
    },
    {
        href:'https://shopgiayreplica.com/phoi-do-moi-phong-cach-voi-mau-giay-nike-air-force-1-white-trang/',
        img:'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357456/image%20sneaker/phoi-do-nike-air-force-1-white-350x235_h13boc.jpg',
        content:'Phối đồ mọi phong cách với mẫu giày Nike Air Force 1 White Trắng',
        sub:'Không phải ngẫu nhiên mà đôi giày Nike Air Force 1 Trắng Full White được coi là “đôi giày quốc dân” đối với giới trẻ. Lý do cũng không quá bất ngờ vì nike af1 trắng sở hữu kiểu dáng thông dụng nhưng không kém phần cá tính, đi kèm sắc trắng tinh khôi có thể kết hợp với mọi kiểu quần áo . Cùng khám phá những phong cách thời trang phối đồ với Air Force 1 Trắng với Shop Giày Replica nhé!'
    },
    {
        href:'https://shopgiayreplica.com/cac-phien-ban-sang-tao-nha-nike-air-force-1-gay-sot-fan-sneaker/',
        img:'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357426/image%20sneaker/giay-nike-af1-color-changing-350x235_htnp4i.jpg',
        content:'Các mẫu giày sáng tạo nhà Nike Air Force 1 gây sốt fan sneaker',
        sub:'Với thiết kế đột phá và sáng tạo, Nike Air Force 1 đã trở thành cái tên huyền thoại của làng thời trang thể thao thế giới. Đến nay,  Air Force 1 vẫn đang chứng minh sức hấp dẫn vượt thời gian của mình bằng những mẫu giày cực chất, cực lạ.'
    },
    
    {
        href:'https://shopgiayreplica.com/hypebeast-la-gi/',
        img:'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357436/image%20sneaker/hypebeast-la-gi-350x235_bknnok.jpg',
        content:'HYPEBEAST LÀ GÌ?',
        sub:'Đối với các tín đồ sneaker chân chính, hypebeast không phải là một thuật ngữ còn quá mới mẻ. Tuy nhiên, hypebeast được hiểu chính xác như thế nào thì không phải ai phải ai cũng biết. Trong bài viết này, SHOP GIAY REPLICA sẽ chia sẻ với các bạn cách hiểu chính xác nhất về thuật ngữ này',
    },
    {
        href:'https://shopgiayreplica.com/giay-sneaker-la-gi/',
        img:'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357431/image%20sneaker/giay-sneaker-shopgiayreplica-350x235_emzbto.jpg',
        content:'GIÀY SNEAKER LÀ GÌ?',
        sub:'Sneaker là một trong những phong cách thời trang được rất nhiều người yêu thích. Nó đã “làm mưa làm gió” trên thị trường trong rất nhiều năm liền. Vậy sneaker là gì? Cùng Shop giày sneaker khám phá trong bài viết dưới đây.'
    },
    {
        href:'https://shopgiayreplica.com/huong-dan-chi-tiet-cach-buoc-day-giay-alexander-mcqueen-don-gian-ma-dep-nhat-hien-nay/',
        img:'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357421/image%20sneaker/b1-350x235_sjsauk.jpg',
        content:'Hướng dẫn chi tiết cách buộc dây giày Alexander Mcqueen đơn giản mà đẹp nhất hiện nay',
        sub:'Những kiểu buộc dây giày Alexander Mcqueen dưới đây chẳng đòi hỏi sự khéo tay hay cầu kỳ mà vẫn biến tấu đôi giày của bạn trở nên cực sành điệu.'
    },
    {
        href:'https://shopgiayreplica.com/nhung-tips-phoi-do-cung-nike-jordan-4-cuc-sanh-dieu/',
        img:'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357446/image%20sneaker/outfit-jordan-4-jeans-350x235_em4ezr.jpg',
        content:'Những tips phối đồ cùng Nike jordan 4 cực sành điệu',
        sub:'Nike Jordan thực sự là một cơn sốt toàn cầu khi ra mẫu nào là sold out mẫu đó trong tích tắc, và Air Jordan 4 cũng không phải trường hợp ngoại lệ khi đôi giày mang một vẻ đẹp bụi đời và có thể biến tấu nhiều cách phối đồ cực cá tính.'
    },
    {
        href:'https://shopgiayreplica.com/sieu-pham-nike-air-jordan-1-x-dior-co-gi-hot/',
        img:'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357441/image%20sneaker/nike-air-jordan-authentic-350x235_d2lro1.jpg',
        content:'Siêu phẩm Nike Air Jordan 1 x Dior có gì HOT?',
        sub:'Trong suốt những năm phát triển, Nike đã liên tục cho ra đời những phiên bản hot và Nike Air Jordan 1 x Dior là một trong số những siêu phẩm như vậy. Giới mộ điệu đánh giá đây là mẫu hàng được mong đợi nhất trong năm 2020.'
    },
]

// ảnh phần đầu body
const imagesPoster = [
    'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357178/image%20sneaker/lich-ban-ra-tet-2024_ah5blj.jpg',
    'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357169/image%20sneaker/anh-client-shop-hcm_qtao2d.jpg',
    'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357173/image%20sneaker/anh-tay_sjgo0v.jpg',
    'https://res.cloudinary.com/duyc4qzad/image/upload/v1708357183/image%20sneaker/luxury-sneaker-shop-hn_x5ekfc.jpg',
];


const dataMenuNavbars = [
    {
        header:'JORDAN',
        isActive:false,
    },
    {
        header:'GIÀY NIKE',
        subs:['NIKE AIR FORCE 1','NIKE SN DUNK', 'NIKE BLAZEK','NIKE SACAL','AIRFEAR OF GOD','NIKE AIR MAX'],
        isActive:false,
    },
    {
        header:'ADIDAS',
        subs:['YEEZY','ULTRA BOOST','ADIFORM Q','SUPERSTAR','ADIDAS FORUM','ADIDAS SAMBA','ALPHAMAGMA','ALPHABOUNCE','STAN SMITH','EQT +'],
        isActive:false,
    },
    {
        header:'NEW BALANCE',
        isActive:false,
    },
    {
        header:'CONVERSE',
        isActive:false,
    },
    {
        header:'MLB',
        isActive:false,
    },
    {
        header:'GIÀY LUXURY',
        subs:['MCQUEEN','GUCCI','DIOR','LOUIS VUITTON','GIÀY AMIRI','SANT LAURENT','GIVENCHY','GIÀY DOLCE & GABBANA'],
        isActive:false,
    },
    {
        header:'BALO',
        subs:['BALO MCM','BALO LOUIS VUITTON', 'BALO DIOR'],
        isActive:false,
    },
    {
        header:'DÉP SIÊU CẤP',
        subs:['DÉP HERMES','YEEZY SLIDE','DÉP ADIDAS','DÉP CROCS','DÉP GUCCI','DÉP BALENCIAGA','DÉP LOUIS VUITTON'],
        isActive:false,
    },
    {
        header:'SẢN PHẢM BÁN CHẠY',
        isActive:false,
    },
]

// footer
const sneaker = [
    {
        header:'GIÀY NIKE',
        content:['Jordan 1','Jordan 4','Air Force 1','SB Durk', 'Nike Blazer'],
    }
]
const otherSneaker = [
    {
        header:'GIÀY KHÁC',
        content:['New Balance','MLB','Gucci','Alexander Mcqueen','Dior','Converse','Vans']
    }
]
const contact = [
    {
        header:'LIÊN HỆ VỚI SHOP',
        content:['Hướng dẫn đặt hàng','Điều Khoản và Điều Kiện Thanh Toán','Chính sách giao hàng và nhận hàng','Contact','Đổi Trả - Bảo Hành','Giới thiệu Shopgiayreplica.com']
    }
]

export {sneaker,otherSneaker,contact,dataTips,imagesPoster,dataMenuNavbars}