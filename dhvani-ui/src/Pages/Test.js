import { useEffect, useState } from "react"



const Test = () => {

    const [a, setA] = useState(100)

    useEffect(() => {
        console.log(a)
    }, [a])


    const onLcikedButton = () => {
        setA(200)
    }

    return <div>{a} <br /> <button onClick={onLcikedButton}>Clcik</button></div>
}

export default Test