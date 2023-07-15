import ImageCard from "./components/Image";
import Breadcrumb from "./components/Breadcrumb";
import Menu from "./UploadOptions/Menu";
import UploadOptions from './UploadOptions/Upload'
import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import Loader from "../../../components/Loader"
import { useDispatch, useSelector } from "react-redux";
import { addError } from "../../../redux/pageErrorHandler"
import DeleteFolders from "./DeleteFolders/index"
import { toast } from 'react-toastify';

const Gallery = () => {

    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)
    
    const [folderOrFile, setFolderOrFile] = useState('folder')
    const [openDialog, setOpenDialog] = useState(false)
    const [open_folders_edit, set_open_folders_edit] = useState(false)
    const [currentPath, setCurrentPath] = useState('/gallery')

    const [getFoldersResults, setGetFoldersResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    });
    const [imgDeleting, setImgDeleting] = useState(false)

    useEffect(() => {
        getFolders('/gallery')
    }, [])

    const getFolders = async (path) => {
        setGetFoldersResults({ 
            loading: true,
            error: false,
            message: "",
            data: null
        })
        try {
            const res = await ApiService.getFolders(path)
            setGetFoldersResults(prev => ({
                ...prev,
                "loading": false,
                "data": res.data.data
            }))
        } catch (error) {
            let message = error.response?.data?.message
            setGetFoldersResults(prev => ({
                ...prev,
                "loading": false,
                "error": true,
                "message": message
            }))
        }
    }


    const onClickFolder = async (path) => {
        setCurrentPath(path)
        getFolders(path)
    }

    const uploadActionHandler = (type) => {
        try {
            setFolderOrFile(type)
            setOpenDialog(true)
        } catch (error) {
            
        }
    }

    const onClickClose = () => {
        const popup = document.getElementById('popup')
        popup.style.transform = `translateY(-100%)`
    }

    const downloadImg = () => {
        const selectedImage = document.getElementById('selectedImage')
        if (selectedImage !== null) {
            if (selectedImage.getAttribute('filename') !== null) {
                window.open(ApiService.downloadMedia(selectedImage.getAttribute('filename')));
            }
        }
    }

    const deleteImg = async () => {
        try {
            const popup = document.getElementById('popup')
            const selectedImage = document.getElementById('selectedImage')
            if (selectedImage !== null) {
                if (selectedImage.getAttribute('fileid') !== null) {
                    setImgDeleting(true)
                    await ApiService.deleteMedia(selectedImage.getAttribute('fileid'))
                    setImgDeleting(false)
                    popup.style.transform = `translateY(-100%)`
                    getFolders(currentPath)
                    toast.success("Image deleted!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            }
        } catch (error) {
            setImgDeleting(false)
            let message = error?.response?.data?.message
            dispatch(addError(message))
        }
    }


    const onClickBack = () => {
        let splitItems = currentPath.split('/')
        splitItems.pop()
        getFolders(splitItems.join('/'))
    }

    const loadFoldersToPopup = () => {
        return getFoldersResults.data?.folders
    }


    return (
        <section>
            <Loader open={getFoldersResults.loading} />
            <DeleteFolders open={open_folders_edit} setOpen={set_open_folders_edit} folders={getFoldersResults.data?.folders} currentPath={currentPath} reload={getFolders} getFolders={loadFoldersToPopup} />
            <div className="container mx-auto px-4 pt-8 pb-3">
                {currentPath !== '/gallery' && <button
                    onClick={onClickBack}
                    title="Delete project"
                    className="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-100"
                >
                    Back
                </button>}
            </div>
            <Breadcrumb currentFolder={getFoldersResults.data} getFolders={getFolders} />

            {authState?.isLoggedIn && authState?.isAdmin && (
                <div className="container mx-auto px-4">
                    <Menu 
                        onClick={uploadActionHandler}
                    />
                    <UploadOptions 
                        type={folderOrFile}
                        open={openDialog}
                        setOpen={setOpenDialog}
                        folderInfo={getFoldersResults.data}
                        getFolders={getFolders}
                    />
                </div>
            )}

            <div className="container mx-auto px-4 py-8">
                <div className="text-xl flex">
                    <span>Folders</span>
                    {authState?.isLoggedIn && authState?.isAdmin && <button
                        onClick={() => set_open_folders_edit(true)}
                        title="Edit Profile"
                        className="text-gray-700 p-2 ml-3 border border-gray-300 rounded-2xl hover:bg-gray-200 transition duration-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                        </svg>
                    </button>}
                </div>
                <hr className="my-4 border-gray-200" />
                <div className="grid md:grid-cols-4 md:gap-4">
                    {getFoldersResults.data?.folders.length > 0 && getFoldersResults.data.folders.map((folder, index) => (
                        <div key={index} className="bg-white rounded-md border overflow-hidden hover:ring-2 ring-[#10a37f] cursor-pointer mt-2" onClick={() => onClickFolder(folder.path)}>
                            <div className="p-4">
                                <h3 className="font-medium text-gray-700"> {folder.folderName} </h3>
                            </div>
                        </div>
                    ))}
                    {getFoldersResults.data?.folders.length === 0 && <div>No folders found.</div>}
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="text-xl flex">
                    <span>Images</span>
                </div>
                <hr className="my-4 border-gray-200" />
                <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">

                    {getFoldersResults.data?.images.length > 0 && getFoldersResults.data.images.map((image, index) => (
                        <ImageCard key={index} data={image} />
                    ))}

                    {getFoldersResults.data?.images.length === 0 && <div>No images found.</div>}

                </div>
            </div>

            <div id='popup'>
            <span className="actions">
                    <button
                        onClick={onClickClose}
                        type="button"
                        className={`bg-[#10a37f] hover:opacity-90 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                    >
                        Close
                    </button>
                    <button
                        onClick={downloadImg}
                        type="button"
                        className={`bg-[#10a37f] mx-2 hover:opacity-90 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                    >
                        Download
                    </button>
                    {authState?.isLoggedIn && authState?.isAdmin && <button
                        onClick={deleteImg}
                        type="button"
                        className={`bg-[#10a37f] hover:opacity-90 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                    >
                        {(imgDeleting) && (
                            <span>
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span>Deleting...</span>
                            </span>
                        )}
                        {(!imgDeleting) && (
                            <span>Delete</span>
                        )}
                    </button>}
            </span>
                <img id='selectedImage' />
            </div>

        </section>
    );
};

export default Gallery;
