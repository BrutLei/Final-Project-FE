import HLSPlayer from "@/components/video-player";
import axios from "@/services/CustomAxios";
import { CloudUploadIcon, Loader2 } from "lucide-react";
import { useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VideoUpload = ({
  courseId,
  chapterId,
  userId,
  previewSrc,
}: {
  courseId: string;
  userId: string;
  chapterId: string;
  previewSrc: string | null;
}) => {
  const navigate = useNavigate();
  const [video, setVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(previewSrc);
  const [uploading, setUploading] = useState(false);
  const [cookies] = useCookies();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      if (!uploading) {
        const file = acceptedFiles[0];
        setVideo(file);
        const previewUrl = URL.createObjectURL(file);
        console.log(previewUrl);

        setPreview(previewUrl);
        const formData = new FormData();
        formData.append("videos", file);
        formData.append("userId", userId); // Provide a default value for userId
        setUploading(true);
        const res = await axios.post(
          `/api/courses/${courseId}/chapters/${chapterId}/upload-video`,
          formData
        );
        if (res) {
          setUploading(false);
          setVideo(null);
          setPreview(null);
          navigate(0);
        }
        toast.success("Chapter uploaded successfully");
      } else {
        toast.error("Please wait for the current upload to finish");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/x-matroska": [".mkv"],
      "video/mp4": [".mp4"],
      "video/mpeg": [".mpeg"],
      "video/webm": [".webm"],
      "video/3gpp": [".3gpp"],
      "video/quicktime": [".mov"],
      "video/x-ms-wmv": [".wmv"],
      "video/x-flv": [".flv"],
      "video/avi": [".avi"],
      "video/x-msvideo": [".avi"],
      "video/ogg": [".ogg"],
      "video/x-m4v": [".m4v"],
      "video/x-ms-asf": [".asf"],
      "video/3gp": [".3gp"],
    },
    multiple: false,
  });

  const handleRemoveImage = async () => {
    try {
      setUploading(true);
      const res = await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/remove-video`,
        { userId, videoUrl: previewSrc },
        { headers: { Authorization: cookies.__clerk_db_jwt } }
      );
      if (res) {
        setUploading(false);
        setVideo(null);
        setPreview(null);
        navigate(0);
      }
      toast.success("Chapter video removed successfully");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="single-image-upload border border-dashed border-[#cccccc] p-5 text-center my-5 mx-auto rounded-lg">
      <div className="relative inline-block w-full">
        <div>
          {uploading ? <></> : <input {...getInputProps()} />}
          {preview ? (
            preview && (
              <div className="relative inline-block w-full">
                {uploading ? (
                  <div className="aspect-video bg-black bg-opacity-50 w-full flex items-center justify-center">
                    <Loader2 className="animate-spin h-8 w-8 text-secondary" />
                  </div>
                ) : (
                  <HLSPlayer
                    src={`http://localhost:3000/api/courses/videos/${previewSrc}`}
                    width="100%"
                    height="auto"
                    className="w-full rounded-md"
                  />
                )}
              </div>
            )
          ) : (
            <div
              {...getRootProps({ className: "cursor-pointer" })}
              className="flex flex-col justify-center items-center"
            >
              <CloudUploadIcon size={48} />
              <p className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer mt-2">
                {uploading ? <></> : <input {...getInputProps()} />}
                Choose a video or drag and drop
              </p>
            </div>
          )}
        </div>
        {preview && !uploading ? (
          <>
            <button
              onClick={handleRemoveImage}
              {...getRootProps({ className: "cursor-pointer" })}
              className="absolute top-[5px] right-[5px] mr-20 bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors"
            >
              {uploading ? <></> : <input {...getInputProps()} />}
              Change
            </button>
            <button
              onClick={handleRemoveImage}
              className="absolute top-[5px] right-[5px] bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      {video && (
        <div className="mt-[10px] text-left">
          <p>Video Name: {video.name}</p>
          <p>Video Size: {(video.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
