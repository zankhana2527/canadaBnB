import React from "react";
import { Button } from "../ui/button";
import FormLabel from "../atoms/label";

interface Props {
  label: string;
  buttons: string[];
  selected: string;
  onChange: (selected: string) => void;
}

const ButtonToggle: React.FC<Props> = ({
  label,
  buttons,
  selected,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <FormLabel label={label} />
      <div className="flex flex-row border border-slate-200 rounded-md p-0.5">
        {buttons.map((button) => (
          <Button
            key={button}
            variant="ghost"
            className={`${
              selected === button ? "bg-blue-200" : ""
            } w-28 hover:bg-blue-100`}
            size="sm"
            onClick={() => onChange(button)}
          >
            {button}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ButtonToggle;
