import {
  FcMultipleDevices,
  FcSalesPerformance,
  FcOldTimeCamera,
  FcSportsMode,
  FcMusic,
} from "react-icons/fc";
import { MdOutlineSecurity } from "react-icons/md";
import { FaDatabase, FaDev } from "react-icons/fa";
import { CiCloudOn } from "react-icons/ci";
import { IconType } from "react-icons/lib";

import { Category } from "../searchPage";
import { CategoryItem } from "./category-item";

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  "Data Science": FaDatabase,
  DevOps: FaDev,
  Fitness: FcSportsMode,
  "Computer Science": FcMultipleDevices,
  "Cyber Security": MdOutlineSecurity,
  "Cloud Computing": CiCloudOn,
  Accounting: FcSalesPerformance,
};

interface CategoriesProps {
  items: Category[];
}

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
