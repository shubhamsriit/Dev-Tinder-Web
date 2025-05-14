import axios from "axios";
import { ACCEPTED, BASE_URL, REJECTED } from "../Utils/Constants";
import { ACCEPTED_REJECTED_REQUEST, GET_REQUESTS } from "../Utils/ApiEndPoints";
import { addRequest } from "../Store/Slices/RequestSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Requests =()=>{
    const dispatch = useDispatch();
    const requestList = useSelector((state) => state?.requests);
    const getReqests = async () => {
      try {
        const res = await axios.get(BASE_URL + GET_REQUESTS, {
          withCredentials: true,
        });
        if (res?.data?.data) {
          dispatch(addRequest(res?.data?.data));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    useEffect(() => {
        getReqests();
    }, []);

    const handleAction=async(status,id)=>{
        try{
            const res = await axios.post(BASE_URL+ ACCEPTED_REJECTED_REQUEST+"/"+status+"/"+id,{},{withCredentials:true});
            if(res){
                getReqests();
            }
        }
        catch(err){console.log(err)}
    }
  
    return (
      <>
        <div className="flex justify-center my-3">
          <h2 className="card-title text-2xl mb-2 underline">Requests ( {requestList?.length} )</h2>
        </div>
        {requestList?.length > 0 ? (
          <div className="w-full" >
            {requestList?.map((user) => {
              const { firstName, lastName, about, photoUrl, _id } = user.fromUserId;
              return (
                <div key={_id} className="flex justify-between sm:w-full md:w-2/3 mx-auto p-2 mb-2 bg-base-100 shadow-xl">
                  <div className="flex w-1/2 gap-2">
                  <div className="w-30 px-2" >
                    <img src={photoUrl} className="w-20 rounded-full h-20 object-cover" alt="user photo" />
                  </div>
                  <div className="mt-3 mx-3 w-70" >
                    <h2 className="capitalize text-lg font-bold">
                      {firstName} {lastName}
                    </h2>
                    <p>{about}</p>
                  </div>
                  </div>
                  <div className="flex justify-end w-1/2 items-center">
                    <div>
                    <button className="btn btn-danger mx-3" onClick={() => handleAction(REJECTED,user?._id)}>DECLINE</button>
                    <button className="btn bg-green-600 text-white" onClick={() => handleAction(ACCEPTED,user?._id)}>ACCEPT</button>
                    </div>
                  </div>
                 
                </div>
              );
            })}
          </div>
        ):<>
         <h2 className="text-center text-2xl my-4 text-gray-500">No Requests Found</h2>
        </>}
      </>
    );
}

export default Requests;