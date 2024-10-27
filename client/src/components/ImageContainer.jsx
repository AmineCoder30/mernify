import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
function ImageContainer({ selectedImage, setSelectedImage }) {
  const [image, setimage] = useState(null);
  const handleShowImage = () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setimage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  useEffect(() => {
    handleShowImage();
  }, [selectedImage]);
  return (
    <div className="absolute bottom-[78px] left-0 p-4 w-[300px]  bg-[#e4f2ff] shadow-sm rounded-sm ">
      <div className="w-full text-right mb-3">
        <button
          onClick={() => setSelectedImage(null)}
          className="bg-[#2176ff] text-white px-2 py-1 rounded-full"
        >
          <RxCross2 />
        </button>
      </div>
      <img src={image} alt="choosen image" />
    </div>
  );
}

export default ImageContainer;
