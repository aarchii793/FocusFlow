const Heading = ({
  icon: Icon,
  title,
  subtitle,
  accent = "indigo",
}) => {
  const accentMap = {
    indigo: "bg-indigo-600",
    green: "bg-green-600",
    yellow: "bg-yellow-500",
    red: "bg-red-600",
    slate: "bg-slate-700",
  };

  return (
    <div className="flex items-start gap-4 mb-8">
      {/* Accent Bar */}
      <div className="flex flex-col items-center">
        <span
          className={`w-1.5 h-10 rounded-full ${accentMap[accent]}`}
        />
        
      </div>

      {/* Text */}
      <div>
        <div className="flex items-center gap-1">
        {Icon && (
          <div className=" flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600">
            <Icon size={16} />
          </div>
        )}
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 leading-tight">
          {title}
        </h2>
        </div>

        {subtitle && (
          <p className="mt-1 max-w-xl text-sm text-slate-500 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default Heading;
