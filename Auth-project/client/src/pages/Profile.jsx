import { useDispatch ,useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserFailure,updateUserStart,updateUserSuccess,deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logout
} from "../redux/userSlice"

const Profile = () => {

  const {
    user: { currentUser },loading,error
  } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, profilePictureUrl: downloadUrl });
        })
    );
  };

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
    console.log(formData)
  }

  const handleSubmit =async (e)=>{
    e.preventDefault()
    try{
      dispatch(updateUserStart)
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.status===false){
        dispatch(updateUserFailure(data))
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    }catch(err){
      dispatch(updateUserFailure(err))
    }
  }

  const handleDeleteUser =async ()=>{
    console.log('delete')
    try{
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
      })
      const data = res.json()
      if(!data.status){
        dispatch(deleteUserFailure(data))
      }
      dispatch(deleteUserSuccess())
    }catch(err){
      dispatch(deleteUserFailure(err))

    }
  }

  const handleLogout = async ()=>{
    try{
      await fetch('/api/user/logout')
      dispatch(logout())
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.profilePictureUrl || currentUser.profilePictureUrl}
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            onClick={() => fileRef.current.click()}
          />
          
            {imageError ? (
                <p className="text-sm self-center">
                    <span className="text-red-600">Error uploading image</span>
                </p>
            ) : imagePercentage > 0 && imagePercentage < 100 ? (
              // <span  className='text-slate-700'>{`Uploading : ${imagePercentage}%`}</span>
              <div className="h-1 min-w-lg bg-gray-300">
                <div
                  style={{ width: `${imagePercentage}%` }}
                  className={`h-full ${
                    imagePercentage < 70 ? "bg-red-600" : "bg-green-600"
                  }`}
                ></div>
              </div>
            ) : imagePercentage === 100 ? (
                <p className="text-sm self-center">
              <span className="text-green-700">
                Image uploaded successfully
              </span>
                </p>
            ) : (
              ""
            )}
          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="Username"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-100 rounded-lg p-3"
            autoComplete="on"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
            autoComplete="on"
          />
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer" onClick={handleDeleteUser}>Delete Account</span>
          <span className="text-red-700 cursor-pointer" onClick={handleLogout}>Sign out</span>
        </div>
        <p className="text-red-600 mt-5">{error && 'Something went wrong'}</p>
        <p className="text-green-600 mt-5">{updateSuccess && 'User updated successfully'}</p>

      </div>
    </>
  );
};

export default Profile;
