import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault()
    try {
        setLoading(true)
        setError(false)
        const res = await fetch('http://localhost:3000/api/auth/signup',{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(formData)
        })
        const data = await res.json()
        setLoading(false)
        if(data.success===false){
            setError(true)
            return
        }
        navigate('/login')
    } catch (error) {
        setLoading(false)
        setError(true)
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold m-7">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="bg-slate-300 p-3 rounded-lg"
            type="text"
            id="username"
            placeholder="username"
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            className="bg-slate-300 p-3 rounded-lg"
            placeholder="email@gmail.com"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            className="bg-slate-300 p-3 rounded-lg"
            placeholder="password"
            onChange={handleChange}
            autoComplete="on"
          />
          <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading?"Loading..":"Sign Up"}
          </button>
        </form>
        <div>
          <p className="flex gap-2 mt-5">Have an account ?</p>
          <Link to={"/login"}>
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
        <p className="text-red-700 mt-5">{error&&'Something went wrong please try again'}</p>
      </div>
    </>
  );
};

export default Signup;
