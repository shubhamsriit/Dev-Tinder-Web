import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar"
import { useEffect } from "react";
import { GET_LOGEED_USER } from "../Utils/ApiEndPoints";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Store/Slices/UserSlice";

const Conatiner=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user);
    const getUser=async()=>{
        try{
            const res = await axios.get(BASE_URL + GET_LOGEED_USER,{withCredentials:true});
            if(res?.data?.data){
                dispatch(addUser(res?.data?.data));
            }
        }
        catch(err){
            navigate("/login");
            console.log(err)
        }
    }

    useEffect(() => {
        if(!userData) getUser();
    },[]);

    return(<>
       <Navbar />
       <div className="h-screen pt-16 mb-32">
       <Outlet></Outlet>  
       </div>
       
       <Footer />
    </>)
}

export default Conatiner;