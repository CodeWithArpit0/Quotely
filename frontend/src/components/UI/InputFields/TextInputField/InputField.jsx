import { TriangleAlert } from "lucide-react";

export default function InputField({
  label,
  id,
  type,
  name,
  placeholder,
  style,
  icon,
  handler,
  value,
  defaultValue,
  tabIndex,
  error,
  errorType,
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm sr-onl">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={handler}
          tabIndex={tabIndex}
          className={`w-full pl-3 rounded-md border border-gray-300 py-2.5 pe-10 shadow-sm sm:text-sm ${style}`}
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" className="text-gray-600 hover:text-gray-700">
            <span className="sr-only">{label}</span>

            <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500">
              {icon}
            </span>
          </button>
        </span>
      </div>

      {error && error?.type === errorType ? (
        <div className="flex items-center gap-x-1">
          <TriangleAlert size={14} className="text-error" />
          <span className="text-error text-[12px]">{error.message}</span>
        </div>
      ) : null}
    </div>
  );
}
