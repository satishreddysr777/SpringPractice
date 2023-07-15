const Button = ({ children, bg, textColor, className = "", onClick, rounded = 'md' }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`bg-[${bg}] hover:opacity-80 text-[${textColor}] border-none rounded-${rounded} box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
