import { useEffect, useState } from "react";
import { AVAILABLE_GENDERS, BASE_URL } from "../Utils/Constants";
import FeedCard from "./FeedCard";
import { addUser } from "../Store/Slices/UserSlice";
import axios from "axios";
import { UPDATE_PROFILE } from "../Utils/ApiEndPoints";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "../Context/SnackBarProvider";
import { useDispatch } from "react-redux";

const EditProfile = ({user,handleCancel}) => {
  const [fisrtName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(user?.age);
  const [about, setAbout] = useState(user?.about);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [error,setError]= useState("");
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  useEffect(() => {
     if(user?.gender){
        AVAILABLE_GENDERS?.forEach((ele)=>{
           if(ele?.value == user?.gender){
              setGender(ele?.key);
           }
        })
     }
  }, []);

  const handleSubmit=async()=>{

    if(!fisrtName || !lastName || !gender || !age || !about || !photoUrl){
      setError("Please fill all the fields");
      return;
    }  
     try{
        setError("");
        const res = await axios.patch(BASE_URL + UPDATE_PROFILE, {
            firstName:fisrtName,
            lastName:lastName,
            gender:gender,
            age:Number(age),
            about:about,
            photoUrl:photoUrl,
          },
          {
            withCredentials: true,
          });
          if(res){
            dispatch(addUser(res?.data?.data));
            snackbar.showSnackbar("Profile Updated Successfully...","success");
            handleCancel();
          }
     }
     catch(error){
        console.log(error.response?.data);
     }
}
  return (
    <>
      {error && <div className="alert alert-error bg-red-500 text-white shadow-lg mb-6">
        <div className="flex align-center w-full gap-2">
          <svg
            style={{marginTop:'3px'}}
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-lg">{error}</span>
        </div>
      </div>}
      <div>
        <h2 className="card-title text-2xl mb-2 underline">Edit Profile</h2>
      </div>
      <div className="flex w-75 justify-center gap-2 my-4 pb-32">
        <div className="w-full">
          <fieldset className="fieldset">
            <legend className="fieldset-legend fw-bold text-lg">
              First Name
            </legend>
            <input
              type="text"
              value={fisrtName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend fw-bold text-lg">
              Last Name
            </legend>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <select value={gender} className="select" onChange={(e) =>{console.log(e?.target.value); setGender(e.target.value)}}>
              <option disabled={true}>select Gender</option>
              {AVAILABLE_GENDERS?.map((gender) => {
                return (
                  <option key={gender.key} value={gender.value}>
                    {gender.key}
                  </option>
                );
              })}
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend fw-bold text-lg">Age</legend>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend fw-bold text-lg">Photo Link</legend>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend fw-bold text-lg">About</legend>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
          <div className="flex justify-between mt-3">
            <button className="btn btn-gray-200 text-black" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn  bg-green-600 text-white" onClick={handleSubmit}>
              SAVE PROFILE
            </button>
          </div>
        </div>
        {/* <div>
            <FeedCard firstName={fisrtName} lastName={lastName} photoUrl={""} about={about} />
        </div> */}
      </div>
    </>
  );
};

export default EditProfile;
