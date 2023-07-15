import Flatpickr from "react-flatpickr";

const SelectDate = ({
    label,
    name,
    value,
    options,
    hasError = false,
    error = null,
    className = "",
    onChange = () => {},
    required,
    placeholder,
}) => {
    
    return (
        <>
            <Flatpickr
                value={value}
                onChange={([date]) => {
                    onChange({ date });
                }}
                options={{...options, disableMobile: true }}
                render={({ defaultValue, value, ...props }, ref) => {
                    return (
                        <DateInputElement
                            defaultValue={defaultValue}
                            inputRef={ref}
                            name={name}
                            label={label}
                            error={error}
                            hasError={hasError}
                            className={className}
                            required={required}
                            placeholder={placeholder}
                        />
                    );
                }}
            />
        </>
    );
};

const DateInputElement = ({
    value,
    className,
    error,
    defaultValue,
    inputRef,
    label,
    onBlur,
    name,
    hasError,
    required,
    placeholder,
    ...props
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
                {...props}
                defaultValue={defaultValue}
                ref={inputRef}
                type="date"
                id={name}
                name={name}
                autoComplete="given-name"
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${className} ${
                    hasError && error
                        ? `border-red-500 border-2 focus:border-red-500 focus:ring-0`
                        : `border-gray-300 focus:border-indigo-500`
                } `}
                onBlur={onBlur}
                placeholder={placeholder}
            />
            {hasError && error && (
                <span className="text-red-600 text-xs">{error}</span>
            )}
        </>
    );
};

export default SelectDate;
