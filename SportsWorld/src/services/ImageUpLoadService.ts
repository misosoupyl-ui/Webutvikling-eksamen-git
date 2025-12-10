import axios from "axios";

// Må matche route i ImageUpLoadController:
const imageUploadEndpoint = "http://localhost:5105/api/ImageUpLoad";

// Laster opp et bilde og returnerer filnavnet (string) eller null hvis noe går galt
const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file); // "file" må matche parameteren i controlleren

    const response = await axios.post(imageUploadEndpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Backend returnerer newFileName (fra Created(... newFileName))
    const fileName = response.data as string;
    return fileName;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export default {
  uploadImage,
};
