interface Props {
  label: string;
}

const FormLabel: React.FC<Props> = ({ label }) => {
  return (
    <label htmlFor={label} className="text-xs text-slate-700 font-medium">
      {label}
    </label>
  );
};

export default FormLabel;
