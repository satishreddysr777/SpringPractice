import { useEffect, useState } from "react";
import ApiService from "../../../../services/ApiService"
import './Image.css'

const ImageCard = ({ data }) => {
    const [showDownload, setShowDownload] = useState(false);

    const [imgSrc, setImagSrc] = useState(null)

    useEffect(() => {
        setImagSrc(ApiService.getMedia(data.fileName))
    }, [])

    const onClickImg = () => {
        const popup = document.getElementById('popup')
        const selectedImage = document.getElementById('selectedImage')
        selectedImage.setAttribute('fileId', data._id)
        selectedImage.setAttribute('fileName', data.fileName)

        popup.style.transform = `translateY(0)`
        selectedImage.src = imgSrc
    }

    return (
        <div className="w-full rounded relative">
            <div className="image-container" onClick={() => onClickImg()}>
                <img src={imgSrc} alt="image" />
                
                {/* <div className="absolute bottom-0 right-0 m-2 rounded actions opacity-0">
                     <a
                        href="https://example.com/download"
                        className="bg-white rounded py-1 px-2 text-gray-800 hover:bg-gray-200"
                    >
                        View
                    </a>
                    <a
                        href="https://example.com/download"
                        className="bg-white rounded py-1 px-2 ml-2 text-gray-800 hover:bg-gray-200"
                    >
                        Download
                    </a>
                    <a
                        href="https://example.com/download"
                        className="bg-white rounded py-1 px-2 ml-2 text-gray-800 hover:bg-gray-200"
                    >
                        Delete
                    </a>
                </div> */}
            </div>

        </div>
    );
};

export default ImageCard;
