import Image from "@/components/Image";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const Woocommerce = ({productCurrent}) => {
    const tabs = ["Mô tả", "Cách chọn size giày"]
    const lengthImage = productCurrent?.images?.length 

    const [tabActive, setTabActive] = useState("")

    const selectTab = (tab) => {
        setTabActive(tab)
    }

    useEffect(() => {
        if (lengthImage > 1) {
            setTabActive(tabs[0])
        } else {
            setTabActive(tabs[1])
        }
    },[productCurrent?.images])
    
    return (
        <div className="text-[17px] pt-[50px]">
            <div className="flex justify-center items-center gap-10 mb-[25px]">
                {tabs.map((tab, index) => {
                    if (productCurrent?.images?.length > 1) {
                    return (
                    <p key={index} className={`text-[22px] cursor-pointer border-b-[1px] ${tabActive == tab ? "font-bold border-b-black" : "font-semibold border-b-[#ccc]"}`}
                    onClick={() => selectTab(tab) }
                    >{tab}</p>)
                    } else {
                        if (index == 1) {
                            return <p key={index} className={`text-[22px] cursor-pointer border-b-[1px] ${tabActive == tab ? "font-bold border-b-black" : "font-semibold border-b-[#ccc]"}`}
                            onClick={() => selectTab(tab) }
                            >{tab}</p>
                        }
                    }
                })}
            </div>

            {tabActive == tabs[0] ?
                <>
                    <div className="flex flex-col">
                        {productCurrent?.images?.map((image, index) =>{ 
                            if (index > 0) return (<Image key={index} src={image.path} className='mt-[10px] w-full'/>)
                        })}
                    </div>
                    <div className="mt-[25px]">
                        <p className="text-[26px] font-bold font-Crimson">{productCurrent?.benefit?.title}</p>
                        <ul>
                            {productCurrent?.benefit?.contents.map((content, index) => { 
                                    const contentArr = content.split("FREESHIP")
                                    return (
                                        <li key={index} className="flex gap-1 items-center ml-[0px] md:ml-[16px] mt-[6px] text-text-l1">
                                            <IoIosArrowForward className="text-primary"/>
                                            {content.includes("FREESHIP") ? <div className="flex-1">{contentArr[0]}<b>FREESHIP</b>{contentArr[1]}</div> : <div className="flex-1">{content}</div>}
                                        </li>
                                    )
                            })}
                        </ul>
                    </div>
                </>
                :
                <>
                    <p className="pb-[10px]">Để chọn size giày phù hợp với chân của mình, bạn có thể làm theo cách sau:</p>
                    <p>
                        <span className="font-bold">Bước 1</span>: Đo chiều dài bàn chân theo huớng dẫn ở hình dưới:
                    </p>
                    <img
                        className="mx-auto"
                        src="../../../assets/images/boardSize.jpg"
                        alt="img size board"
                    />
                    <p>
                        <span className="font-bold pb-[10px]">Bước 2</span>: Sau khi đo được chiều dài bàn chân, bạn có thể đối
                        chiếu với bảng size giày dưới để chọn được size giày phù hợp cho mình. Ví dụ chiều dài bàn chân là
                        26.5cm thì size giày nam Adidas phù hợp là 42.
                    </p>
                    <p>{`Chúc các bạn lựa chọn được đôi giày ưng ý :)`}</p>
                </>
            }
        </div>
    );
};

export default Woocommerce;
