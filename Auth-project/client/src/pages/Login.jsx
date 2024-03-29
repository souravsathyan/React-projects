
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {useSelector, useDispatch} from "react-redux"
import {loginFailure, loginSuccess, loginStart} from "../redux/userSlice.js"
import OAuth from "../components/OAuth.jsx"

const schema = Yup.object().shape({
  email: Yup.string()
    .required("email is a required field")
    .email("Enter a Valid Email"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const {loading, error} = useSelector((store)=>store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    try {
      dispatch(loginStart())
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.status == false) {
        dispatch(loginFailure(data.message))
        return;
      }
      dispatch(loginSuccess(data))
      navigate('/')
    } catch (err) {
      dispatch(loginFailure(err))
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-2xl">Login</h1>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              id="email"
              className="bg-slate-300 p-3 rounded-lg"
              placeholder="email@gmail.com"
              onChange={handleChange}
              values={values.email}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              id="password"
              className="bg-slate-300 p-3 rounded-lg"
              placeholder="password"
              onChange={handleChange}
              values={values.password}
              onBlur={handleBlur}
              autoComplete="on"
            />
            {errors.password && touched.password && errors.password}

            <button
              type="submit"
              disabled={loading}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading.." : "Login"}
            </button>
            <OAuth/>
          </form>
        )}
      </Formik>
      <div>
        <p className="flex gap-2 mt-5">Dont have an account ?</p>
        <Link to={"/signup"}>
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error || "Something went wrong please try again" : ""}
      </p>
    </div>
  );
};

export default Login;
