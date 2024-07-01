import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}
const Editor = ({ onChange, value }: EditorProps) => {
  return (
    <ReactQuill
      className="bg-white"
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
};

export default Editor;
