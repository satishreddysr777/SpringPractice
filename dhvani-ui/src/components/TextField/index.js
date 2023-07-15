const TextField = ({
    autoFocus = false,
    label,
    name,
    value,
    onChange,
    onBlur,
    type = "text",
    error,
    className = "",
    touched = false,
    required,
    disabled = false
}) => {
    return (
        <>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}{" "}
                {required && <span className="text-md text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                disabled={disabled}
                id={name}
                // autoFocus={autoFocus}
                autoComplete="given-name"
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${className} disabled:opacity-[.5] ${
                    error && touched
                        ? `border-red-500 border-2 focus:border-red-500 focus:ring-0`
                        : `border-gray-300 focus:border-indigo-500`
                } `}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
            />
            {touched && error && (
                <span className="text-red-600 text-xs">{error}</span>
            )}
        </>
    );
};

export default TextField;
