import axiosInstance from "@services/instance";
import { useState } from "react";

const MediaUpload = () => {
    const [file, setFile] = useState<any>();
    const [uploaded, setUploaded] = useState<any>();

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0])
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('type', 'PROFILE')
            formData.append('file', file)
            const response = await axiosInstance.post('/media', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploaded(response.data.data[0].mimeType)
            console.log(file, "file")
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div >
            <form onSubmit={handleSubmit}
                className="flex flex-col gap-y-3">
                <h1>Media Upload</h1>
                <input type="file" onChange={handleFileChange} />
                {file && <img src={URL.createObjectURL(file)} className="border-2 border-black" style={{ height: "200px", width: "200px", objectFit: "contain" }}  ></img>}

                <button type="submit" className=" w-fit px-2 border-2 border-black rounded-md ">Upload</button>
            </form>
            {uploaded && <img src={uploaded} alt="img" />}
            {uploaded && <p>{uploaded}</p>}
        </div>
    )
}

export default MediaUpload