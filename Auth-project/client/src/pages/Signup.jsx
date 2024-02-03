import {Link} from "react-router-dom"
const Signup = ()=>{
    return (
        <>
            <div className="p-3 max-w-lg mx-auto">
                <h1 className="text-3xl text-center font-semibold m-7">Sign Up</h1>
                <form className="flex flex-col gap-4">
                    <input className="bg-slate-300 p-3 rounded-lg" type="text" placeholder="username" />
                    <input type="email" className="bg-slate-300 p-3 rounded-lg" placeholder="email@gmail.com"/>
                    <input type="password" className="bg-slate-300 p-3 rounded-lg" placeholder="password"/>
                    <button
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                    >Sign Up</button>
                </form>
                <div>
                    <p className="flex gap-2 mt-5">Have an account ?</p>
                    <Link to={'/login'}>
                        <span className="text-blue-500">Sign in</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Signup