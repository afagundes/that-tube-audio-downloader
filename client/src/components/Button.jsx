const Button = ({ text }) => {
    return (
        <button 
            type="button" 
            className="bg-red-500 hover:bg-red-700 active:bg-red-900 text-slate-100 p-1 px-4 
                        w-fit md:w-40 rounded-md mx-4
                        transition-colors ease-in-out duration-300"
        >
            {text}
        </button>
    );
}

export default Button;
