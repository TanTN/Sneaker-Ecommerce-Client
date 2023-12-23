import React, { useCallback, useState } from 'react'
import Slider from 'react-slick';
import ImageViewer from "react-simple-image-viewer";

import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";

import Image from '@/components/Image';

const SlideImages = ({ productCurrent }) => {
    
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const images = productCurrent?.images?.map(image => image.path)

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
      }, []);
    
      const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };
    
    // cấu hình button pre và next slide hình ảnh
    function SampleNextArrow(props) {
        const { style, onClick } = props;
        return (
          <div
            className="absolute top-[50%] right-[2%] z-[1] text-text-l1 text-[35px] translate-y-[-50%] cursor-pointer"
            style={{ ...style, display: "block"}}
            onClick={onClick}
          ><TfiArrowCircleRight /></div>
        );
      }
      
      function SamplePrevArrow(props) {
        const { style, onClick } = props;
        return (
            <div
              className="absolute top-[50%] left-[2%] z-[1] text-text-l1 text-[35px] translate-y-[-50%] cursor-pointer"
              style={{ ...style, display: "block"}}
              onClick={onClick}
            ><TfiArrowCircleLeft /></div>
          );
    }
    
    function SampleNextArrowEmpty() {
        return (<div />)
    }
    function SamplePreArrowEmpty() {
        return (<div />)
    }
  return (
    <>
        {productCurrent?.images?.length == 1 && <Image src={productCurrent?.images[0]?.path} alt="img" />}
        {productCurrent?.images?.length > 1 && (
            <>
                <div className='mb-[5px]'>
                    <Slider
                        asNavFor={nav2}
                        ref={(slider1) => setNav1(slider1)}
                        nextArrow={<SampleNextArrow />}
                        prevArrow={<SamplePrevArrow />}
                    >
                        {productCurrent?.images.map((image, index) =>
                            <Image key={image._id} src={image?.path} alt="img" className="w-full px-[1px] cursor-pointer" onClick={() => openImageViewer(index)} />
                        )}
                    </Slider>
            
                    {isViewerOpen && (
                        <ImageViewer
                            src={images}
                            currentIndex={currentImage}
                            onClose={closeImageViewer}
                            disableScroll={false}
                            backgroundStyle={{
                              backgroundColor: "rgba(0,0,0,0.9)"
                            }}
                            closeOnClickOutside={true}
                            className="z-[300]"
                        />
                    )}
                </div>
          
                <div className='w-full'>
                    <Slider
                    asNavFor={nav1}
                    ref={(slider2) => setNav2(slider2)}
                    slidesToShow={6}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    nextArrow={<SampleNextArrowEmpty />}
                    prevArrow={<SamplePreArrowEmpty />}
                    >
                        {productCurrent?.images.map((image,index) => (<Image key={image._id} src={image?.path} alt="img" className={`md:min-h-[78px] cursor-pointer px-[2px]`}/>))}
                    </Slider>
                </div>
            </>
        )}
    </>
  )
}

export default SlideImages