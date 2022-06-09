import Spinner from "./Spinner";

const Button = ({ text, isSubmit, action, showLoading, active }) => {
    return (
        <div className="relative">

            {active && (
                <div className="absolute -top-1 right-3">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-200"></span>
                    </span>
                </div>
            )}

            <button
                type={isSubmit ? 'submit' : 'button'}
                onClick={showLoading ? null : action}
                className="bg-red-500 hover:bg-red-700 active:bg-red-900 text-slate-100 p-1 px-4 
                        w-fit md:w-40 rounded-md mx-4
                        flex justify-center
                        transition-colors ease-in-out duration-300"
            >
                <div className="w-fit flex flex-row gap-2 align-middle">
                    {showLoading && <Spinner />}
                    {showLoading ? "Loading..." : text}
                </div>
            </button>
        </div>
    );
}

export default Button;
