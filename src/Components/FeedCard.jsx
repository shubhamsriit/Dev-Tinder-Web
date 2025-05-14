import axios from "axios";
import { SEND_REQUEST } from "../Utils/ApiEndPoints";
import { BASE_URL, IGNORED, INTERESTED } from "../Utils/Constants";

const FeedCard = ({id,firstName,lastName,photoUrl,about,handleSemdRequest }) => {
  const handleAction = async(status) => {
     try{
      const res = await axios.post(BASE_URL+ SEND_REQUEST+"/"+status+"/"+id,{},{withCredentials:true});
      if(res){
        handleSemdRequest();
      }
     }
     catch(err){console.log(err)}
  };
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="w-full">
          <img
            src={photoUrl}
            alt="user photo"
            className="w-full h-50 object-contain"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title capitalize m-0 p-0">{firstName} {lastName}</h2>
          <p>
           {about}
          </p>
          <div className="card-actions justify-between my-5">
            <button className="btn btn-danger" onClick={()=>handleAction(IGNORED)}>IGNORE</button>
            <button className="btn bg-green-600 text-white" onClick={()=>handleAction(INTERESTED)}>INTERESTED</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedCard;
