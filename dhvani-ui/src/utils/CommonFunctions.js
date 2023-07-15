function extractFileInfo (contentTypeHeader) {
    const contentTypePattern = /^([^/]+)\/([^;]+)(?:;|$)/;
    const filenamePattern = /filename=["']?([^'"\s]+)["']?$/;
    const matches = contentTypeHeader.match(contentTypePattern);
    const fileInfo = {
        contentType: null,
        filename: null,
    };
    if (matches && matches.length >= 3) {
        fileInfo.contentType = matches[0];
        fileInfo.type = `${matches[1]}/${matches[2]}`;
        const filenameMatch = contentTypeHeader.match(filenamePattern);
        if (filenameMatch && filenameMatch.length >= 2) {
            fileInfo.filename = filenameMatch[1];
        }
    }
    return fileInfo;
}

const convertLocalDateToUTC = (date) => {
    let localDate = new Date()
    if (date) {
        localDate = new Date(date)
    }
    
    const timestamp = Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
        localDate.getHours(),
        localDate.getMinutes(),
        localDate.getSeconds(),
        localDate.getMilliseconds(),
    );

    return new Date(timestamp);
}

const convertUTCToLocal = (date) => {
    let utcDate = new Date(date)
    return new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
        utcDate.getUTCHours(),
        utcDate.getUTCMinutes(),
        utcDate.getUTCSeconds(),
        utcDate.getUTCMilliseconds(),
    );
}


export { extractFileInfo, convertLocalDateToUTC, convertUTCToLocal };