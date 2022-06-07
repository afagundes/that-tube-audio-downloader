import Button from "./Button";

const Form = () => {
    return (
        <form className="mt-6 w-full">
            <input type="text" 
                className="w-full text-zinc-800 bg-slate-100 outline-none p-2 rounded-md"
                placeholder="https://www.youtube.com/watch?v=BPVu5xaZk-4"
                autoFocus
            />

            <div className="flex flex-row items-center justify-center mt-6">
                <Button text="Download" />
                <Button text="Play" />
            </div>
        </form>
    );
}

export default Form;