import React, { useState, useEffect } from "react";

const ProgressBar = ({ progress }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(progress);
    }, [progress]);

    return (
        <div className="w-full h-2 bg-gray-300 rounded-full">
            <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${width}%` }}
            ></div>
            {width}%
        </div>
    );
};

export default ProgressBar;
