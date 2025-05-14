import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Store/Slices/UserSlice";
import logo from "../assets/devtinder_logo.png";
import { BASE_URL } from "../Utils/Constants";
import { LOGIN } from "../Utils/ApiEndPoints";
import { useSnackbar } from "../Context/SnackBarProvider";

const Login = () => {
    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const {showSnackbar}= useSnackbar();
    const handleLogin=async()=>{
        try{
            const res = await axios.post(BASE_URL+LOGIN,{
                email:emailId,
                password    
            },{withCredentials:true});
            if(res?.data?.data){
              dispatch(addUser(res?.data?.data));
              showSnackbar("Login Successfully Done...","success");
              navigate("/feed");
            }
        }
        catch(err){
           console.log(err)
        }
    }

  return (
    <div className="flex justify-center w-full bg-base-300 h-screen">
      <div className="sm:w-full md:w-75">
        <div>
          <div>
            <img src={logo} style={{mixBlendMode:"darken"}} className="w-60 mx-auto" />
          </div>
          {/* <h2 className="card-title justify-center text-2xl">Login</h2> */}
          <div className="mb-5">
            <fieldset className="fieldset">
              <legend className="fieldset-legend fw-bold text-lg">Email ID</legend>
              <input type="text" value={emailId} onChange={(e)=>setEmailId(e.target.value)} className="input" placeholder="Type here" />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend fw-bold text-lg">Password</legend>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input" placeholder="Type here" />
            </fieldset>
          </div>
          <div className="justify-center card-actions">
            <button className="btn w-full bg-green-600 text text-white text-lg" onClick={handleLogin}>Login</button>
          </div>
          <div className="text-center mt-3">
             <h6>Don't have an account? <a href="/signup" className="text-primary font-semibold">Sign Up</a></h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
