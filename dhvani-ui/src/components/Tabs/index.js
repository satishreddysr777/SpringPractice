import { useEffect, useState, Fragment } from "react"


const Tabs = ({ headers, children }) => {

    const [tabHeaders, setTabHeaders] = useState([])
    const [currTabIndex, setCurrTabIndex] = useState(0)

    useEffect(() => {
        let newHeaders = []
        for (let i = 0; i < headers.length; i++) {
            newHeaders.push({
                ...headers[i]
            })
        }
        setTabHeaders(newHeaders)
        console.log(children)
    }, [headers])

    const onClickTab = (tabIndex) => {
        setCurrTabIndex(tabIndex)
    }


    return (
        <section>
            
            <div className="xl:w-full xl:mx-0 h-12 hidden sm:block bg-white shadow rounded">
                    <div className="flex border-b px-5">
                        {tabHeaders.map((headItem, index) => (
                                <button key={index} onClick={() => onClickTab(index)} className={`focus:outline-none focus:text-[#10a37f] text-sm border-[#10a37f] pt-3 rounded-t mr-12 cursor-pointer hover:text-[#10a37f] ${
                                    currTabIndex === index
                                        ? `text-[#10a37f]`
                                        : `text-gray-600`
                                }`}>
                                    <div className="flex items-center mb-3">
                                        <span className="ml-1 font-normal">
                                            {headItem.title}
                                        </span>
                                    </div>
                                    <div className={`w-full h-1 bg-[#10a37f] rounded-t-md ${
                                        currTabIndex !== index && "hidden"
                                    }`}></div>
                                </button>
                        ))}
                    </div>

                    {children[currTabIndex]}
                </div>
        </section>
    )
}

export default Tabs
