import { cn } from "@/lib/utils";
import axios from "@/services/CustomAxios";
import { CloudUploadIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AttachmentUpload = ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<Array<File>>([]);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append("attachments", file);
        setFileList([...fileList, file]);
      });
      formData.append("userId", userId || "");
      console.log("formData", formData);

      const res = await axios.patch(
        `api/courses/${courseId}/upload-attachments`,
        formData
      );
      if (res) {
        setFileList([]);
        navigate(0);
      }
      toast.success("Attachments uploaded successfully");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: true,
  });

  const acceptedFileItems = acceptedFiles.map((file, index) => (
    <li key={file.name} className="truncate">
      {index + 1 + ". "}
      {file.name} - {file.size} bytes
    </li>
  ));

  const handleRemoveImage = async () => {
    try {
      setFileList([]);
      toast.success("Attachments removed successfully");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className=" border border-dashed border-[#cccccc] p-5 text-center my-5 mx-auto rounded-lg">
      <div
        className={cn(
          "block",
          fileList.length > 0 && "overflow-y-scroll h-auto max-h-48"
        )}
      >
        <div {...getRootProps({ className: "cursor-pointer" })}>
          <input {...getInputProps()} />
          {fileList.length > 0 ? (
            fileList && (
              <div className="text-left mb-6">
                <ol className="list-disc">{acceptedFileItems}</ol>
              </div>
            )
          ) : (
            <>
              <div className="flex flex-col justify-center items-center">
                <CloudUploadIcon size={48} />
                <p className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer mt-2">
                  Choose a file or drag and drop
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {fileList.length > 0 && (
        <button
          onClick={handleRemoveImage}
          className="m-auto bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default AttachmentUpload;
