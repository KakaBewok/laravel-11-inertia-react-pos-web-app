const urlToFile = async (
    url: string,
    fileName: string,
    mimeType: string
): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
};

export default urlToFile;
