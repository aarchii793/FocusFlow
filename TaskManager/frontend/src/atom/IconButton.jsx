import React from "react";
import { useNavigate } from "react-router-dom";

const IconButton = ({
  label = "Action",
  type = "button",
  onClick,
  to,
  variant = "default",
  loading = false,
  disabled = false,
  className = "",
  icon: Icon,
  iconSize = 16,
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled || loading) return;
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  const variants = {
    default:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    subtle:
      "bg-slate-100 text-slate-700 hover:bg-slate-200",
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700",
    danger:
      "bg-red-600 text-white hover:bg-red-700",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2
        rounded-md px-2.5 py-1.5
        text-xs font-medium
        transition-colors
        focus:outline-none focus:ring-2 focus:ring-indigo-500/30
        ${variants[variant]}
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {Icon && <Icon size={iconSize} />}

      {label && (
        <span className="whitespace-nowrap">
          {loading ? "Loading…" : label}
        </span>
      )}
    </button>
  );
};

export default IconButton;
