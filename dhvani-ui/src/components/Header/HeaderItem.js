import { useNavigate } from 'react-router-dom'

const HeaderItem = ({ name, href, navigateTo }) => {

    return (
        <div>
            <span
                onClick={() => navigateTo(href)}
                className="cursor-pointer block py-2 pr-4 pl-3 lg:border-0 lg:hover:text-primary-700 lg:p-0 text-gray-200 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
            >
                {name}
            </span>
        </div>
    );
};

export default HeaderItem;
