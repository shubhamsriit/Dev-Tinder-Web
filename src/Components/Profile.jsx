import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useState } from "react";

const Profile = () => {
    const user = useSelector(state=>state.user);
    const [showEditProfile,setShowEditProfile] = useState(false); 
    const handleCancel=()=>{setShowEditProfile(false)}
  return (
    <>
      {showEditProfile ? (
        <div className="flex sm:w-95 md:w-full justify-center my-5">
          <div className="w-75">
            <EditProfile user={user} handleCancel={handleCancel} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex sm:w-95 md:w-full justify-center my-5">
            <div>
              <div className="card bg-base-100 w-full shadow-sm">
                <figure>
                  <img
                    src={user?.photoUrl}
                    alt="user photo"
                    className=" h-50 object-cover rounded-full"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title capitalize">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p>{user?.about}</p>
                  <div className="flex flex-wrap">
                    {user?.skills?.length > 0 &&
                      user?.skills.map((skill) => {
                        return (
                          <span key={skill} className="badge font-bold text-sm bg-black text-white badge-outline pt-3 pb-3">
                            {skill}
                          </span>
                        );
                      })}
                  </div>
                  <div className="card-actions justify-between my-5">
                    <button
                      className="btn btn-danger"
                      onClick={() => setShowEditProfile(true)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
