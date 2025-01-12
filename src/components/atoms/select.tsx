import React from "react";
import {
  Select as ShadcnSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import FormLabel from "./label";

interface Props {
  label: string;
  placeholder: string;
  options: string[];
  onSelectionChange: (value: string) => void;
}

const Select: React.FC<Props> = ({
  placeholder,
  options,
  label,
  onSelectionChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <FormLabel label={label} />
      <ShadcnSelect onValueChange={onSelectionChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem value={option} key={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </div>
  );
};

export default Select;
