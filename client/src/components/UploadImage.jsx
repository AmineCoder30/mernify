import React, { useState, useRef } from "react";
import profile from "../assets/profile.jpg";
import { PiCameraPlus } from "react-icons/pi";
function UploadImage({ setFormData, formData }) {
  const hiddenFileInput = useRef(null);
  const [image, setimage] = useState(profile);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setimage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };

  return (
    <div className="flex w-full h-fit items-center justify-center">
      <div className="bg-gray-300 w-32 h-32 rounded-full relative border-dashed border-[#7747ff] border-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={hiddenFileInput}
          className="hidden"
          name="image"
        />
        <button
          onClick={handleClick}
          className="bg-[#7747ff] text-white absolute right-0 bottom-0 font-semibold p-2 rounded-full shadow-lg hover:bg-[#713eff] transition duration-200"
        >
          <PiCameraPlus />
        </button>
        <div className=" w-full h-full rounded-full overflow-hidden">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
