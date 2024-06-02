import axios from "@/services/CustomAxios";
import { CloudUploadIcon } from "lucide-react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FileUpload = ({
  courseId,
  userId,
  previewSrc,
}: {
  courseId: string;
  userId: string;
  previewSrc: string | null;
}) => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(previewSrc);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      const formData = new FormData();
      formData.append("thumbnail", file);
      formData.append("userId", userId || ""); // Provide a default value for userId
      const res = await axios.patch(
        `/api/courses/${courseId}/upload-image`,
        formData
      );
      if (res) {
        setImage(null);
        setPreview(null);
        navigate(0);
      }
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    multiple: false,
  });

  const handleRemoveImage = async () => {
    try {
      const res = await axios.delete(`/api/courses/delete-image/${courseId}`);
      if (res) {
        setImage(null);
        setPreview(null);
        navigate(0);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="single-image-upload border border-dashed border-[#cccccc] p-5 text-center my-5 mx-auto rounded-lg">
      <div className="relative inline-block">
        <div {...getRootProps({ className: "cursor-pointer" })}>
          <input {...getInputProps()} />
          {preview ? (
            preview && (
              <div className="relative inline-block">
                <img
                  src={`http://localhost:3000/api/courses/images/${preview}`}
                  alt="Preview"
                  className="w-full rounded-md"
                />
              </div>
            )
          ) : (
            <div className="flex flex-col justify-center items-center">
              <CloudUploadIcon size={48} />
              <p className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer mt-2">
                Choose a file or drag and drop
              </p>
            </div>
          )}
        </div>
        {preview && (
          <button
            onClick={handleRemoveImage}
            className="absolute top-[5px] right-[5px] bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
          >
            Remove
          </button>
        )}
      </div>
      {image && (
        <div className="mt-[10px] text-left">
          <p>Image Name: {image.name}</p>
          <p>Image Size: {(image.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
