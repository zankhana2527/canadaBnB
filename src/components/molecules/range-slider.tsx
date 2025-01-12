import React from "react";
import { Slider } from "../ui/slider";
import FormLabel from "../atoms/label";

interface Props {
  min: number;
  max: number;
  onChange: (value: [number, number]) => void;
  range: [number, number];
  label: string;
}

const RangeSlider: React.FC<Props> = ({ min, max, onChange, range, label }) => {
  return (
    <div className="flex flex-col justify-between gap-3">
      <FormLabel label={label} />
      <div className="relative">
        <Slider
          defaultValue={[range[0], range[1]]}
          min={min}
          max={max}
          onValueChange={(range) => onChange(range as [number, number])}
        />
        <div className="w-full flex flex-row justify-between">
          <p className="text-slate-500 text-xs mt-2">Min: {range[0]}</p>
          <p className="text-slate-500 text-xs mt-2">Max: {range[1]}</p>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
