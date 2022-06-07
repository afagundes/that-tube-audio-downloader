const Layout = ({ children }) => {
    return (
        <div className='bg-neutral-900 h-screen w-screen flex flex-col justify-center items-center p-5 md:p-6'>
            <div className="flex flex-col justify-center items-center max-w-3xl">
                { children }
            </div>
        </div>
    );
}

export default Layout;
