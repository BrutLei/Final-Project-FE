import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useState } from "react";

const options = {
  apiKey: "free",
  maxFileCount: 1,
  mimeTypes: ["image/*"],
  editor: {
    images: {
      allowResizeOnMove: true, // True by default. If false, prevents cropper from resizing when moved.
      preview: true, // True by default if cropping is enabled. Previews PDFs and videos too.
      crop: true, // True by default.
      cropRatio: 16 / 9, // Width / Height. Undefined enables freeform (default).
      // "rect" (default) or "circ".
    },
  },
};

const FileUpload = () => {
  const [file, setFile] = useState<File | unknown>();

  return (
    <UploadDropzone
      options={options}
      onUpdate={(event) => {
        if (event.pendingFiles) {
          setFile(event.pendingFiles[0]);
        }
      }}
    />
  );
};

export default FileUpload;
