import { cn } from "@/lib/utils";
import React from "react";

interface ComboboxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}

const Combobox = React.forwardRef<HTMLSelectElement, ComboboxProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-20 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm ring-offset-gray-100 placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

export default Combobox;
