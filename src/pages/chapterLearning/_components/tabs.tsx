import "./styles.css";
interface TabsProps {
  toggleState: number;
  setToggleState: (index: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({ toggleState, setToggleState }) => {
  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  return (
    <div className="flex items-center space-x-4">
      <div
        className={`w-full flex justify-center cursor-pointer ${
          toggleState === 1 ? "active-tab" : "opacity-60"
        }`}
        onClick={() => {
          toggleTab(1);
        }}
      >
        <button className="text-sky-800 font-semibold my-3">Overview</button>
      </div>
      <div
        className={`w-full flex justify-center cursor-pointer ${
          toggleState === 2 ? "active-tab" : "opacity-60"
        }`}
        onClick={() => {
          toggleTab(2);
        }}
      >
        <button className="text-sky-800 font-semibold my-3">Comments</button>
      </div>
    </div>
  );
};
