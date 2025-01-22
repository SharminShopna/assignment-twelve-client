import axios from "axios";

export const imageUpload = async (imageData) => {
    try {
        const formData = new FormData();
        formData.append("image", imageData);

        // Send POST request to imgbb API
        const { data } = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );


        return data?.data?.url;
    } catch (error) {
        console.error("Image upload failed:", error);
        throw new Error(error.response?.data?.error?.message || "Image upload failed");
    }
};