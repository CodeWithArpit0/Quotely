export default function SelectInputField({
  label,
  id,
  name,
  value,
  defaultValue,
  options = [],
  handler,
  placeholder,
  error,
  errorType,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>

      <select
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={handler}
        className={`mt-1.5 w-full py-2 pl-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm ${
          error.error && error.type === errorType ? "bg-red-100" : ""
        }`}
      >
        <option value="">{placeholder ? placeholder : "Please select"}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
