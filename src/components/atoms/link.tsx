import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  href: string;
  label: string;
}

const Link: React.FC<Props> = ({ href, label }) => {
  return (
    <div>
      <RouterLink
        to={href}
        target="_blank"
        className="font-sm hover:underline text-slate-600 hover:text-slate-700"
      >
        {label}
      </RouterLink>
    </div>
  );
};

export default Link;
