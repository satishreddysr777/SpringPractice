import { useEffect, useState } from "react"

const Breadcrumb = ({ currentFolder, getFolders }) => {

    const [items, setItems] = useState([])

    useEffect(() => {
        if (currentFolder) {
            let path = currentFolder.path
            let pathArray = path.split('/')
            let _items = []
            for (let i = 0; i < pathArray.length; i++) {
                if (pathArray[i] !== '' && pathArray[i] !== null && pathArray !== undefined) {
                    _items.push({
                        'name': pathArray[i].charAt(0).toUpperCase() + pathArray[i].slice(1)
                    })
                }
            }
            setItems(_items)
        }
    }, [currentFolder])


    const onClickFolder = (index) => {
        console.log(currentFolder.path, index)
        let pathArray = currentFolder.path.split('/')
        pathArray.splice(index + 2) // Because of space in position of '0' in pathArray, we are adding 2
        getFolders(pathArray.join('/'))
    }

    
    return (
        <div className="container mx-auto px-4 pb-8">
            <nav
                className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50"
                aria-label="Breadcrumb"
            >
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    {items.map((item, index) => (
                        <li key={index} onClick={() => {
                            if (items.length - 1 !== index) {
                                onClickFolder(index)
                            }
                        }}>
                            <div className="flex items-center">
                                {index > 0 && (
                                    <svg
                                        aria-hidden="true"
                                        className="w-6 h-6 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                )}
                                {items.length - 1 === index && (
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                                        {item.name}
                                    </span>
                                )}
                                {items.length - 1 !== index && (
                                    <span
                                        className="inline-flex items-center text-sm font-medium text-gray-700 cursor-pointer"
                                    >
                                        {item.name}
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
