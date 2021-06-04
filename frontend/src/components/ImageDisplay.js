import React, {useState, useCallback } from 'react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import "./ImageDisplay.css"
/*
react photo gallery
https://www.npmjs.com/package/react-photo-gallery
*/

const ImageDisplay = ({images}) => {
	const [currentImage, setCurrentImage] = useState(0);
  	const [viewerIsOpen, setViewerIsOpen] = useState(false);

  	const openLightbox = useCallback((event, { photo, index }) => {
    	setCurrentImage(index);
    	setViewerIsOpen(true);
  	}, []);

  	const closeLightbox = () => {
    	setCurrentImage(0);
    	setViewerIsOpen(false);
  	};

  /*given a an array of image object with shape:
    {
      src: String
      width: Number,
      height: Number,

    }
    */
	return (
    <div className='ui raised segment'>
      <Gallery photos={images} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={images.map(x => ({
                ...x,
                srcset: x.src,
                caption: x.description
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
export default ImageDisplay