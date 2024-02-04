import {GoogleAuthProvider,signInWithPopup, getAuth} from "firebase/auth"
import { app } from "../firebase"
import { useDispatch} from "react-redux"
import {loginSuccess} from "../redux/userSlice.js"


const OAuth = ()=>{
    const dispatch = useDispatch()

    const handleGoogleClick =async ()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result =await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
            })
            const data = await res.json()
            console.log(data)
            dispatch(loginSuccess(data))
        } catch (error) {
            console.log("google auth error", error)
        }
    }

    return(
        <>
            <button
            onClick={handleGoogleClick}
            type="button"
            className="bg-red-700 text-white rounded-lg p-3 hover:opacity-95"
            >Continue with google</button>
        </>
    )
}

export default OAuth