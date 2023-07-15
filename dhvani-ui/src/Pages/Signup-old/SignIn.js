
import Dropdown from "./Dropdown"
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const navigate = useNavigate()

    return (

        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 h-[70vh]">
                
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Your email
                                </label>
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <span className="text-red-600 text-sm">Invalid email</span>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                            </div>
                            <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none">Sign In</button>
                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline" onClick={() => navigate('/signup')}>Sign up</a>
                            </p>
                            <div className="bg-red-100 rounded-md py-2 px-6 mb-4 text-base text-red-700" role="alert">
                                A simple danger alert with <a href="#" className="font-bold text-red-800">an example link</a>.
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}


export default SignIn