import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Store/Slices/ConnectionSlice";
import { GET_CONNECTIONS } from "../Utils/ApiEndPoints";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionList = useSelector((state) => state?.connections);
  const getConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + GET_CONNECTIONS, {
        withCredentials: true,
      });
      if (res?.data?.data) {
        dispatch(addConnections(res?.data?.data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getConnection();
  }, []);

  return (
    <>
      <div className="flex justify-center my-3">
        <h2 className="card-title text-2xl mb-2 underline">Connections ( {connectionList?.length} )</h2>
      </div>
      {connectionList?.length > 0 ? (
        <div className="pb-20">
          {connectionList?.map((user) => {
            const { firstName, lastName, about, photoUrl, _id } = user;
            return (
              <div key={_id} className="flex align-center sm:w-full  md:w-1/3 p-2 mb-2 mx-auto bg-base-100 shadow-xl">
                <figure>
                  <img src={photoUrl} className="w-20 rounded-full h-20 object-cover" alt="user photo" />
                </figure>
                <div className="mt-3 mx-3" >
                  <h2 className="capitalize text-lg font-bold">
                    {firstName} {lastName}
                  </h2>
                  <p>{about}</p>
                </div>
              </div>
            );
          })}
        </div>
      )
      : (
        <h2 className="text-xl text-center my-3">No connections</h2>
      )
      }
    </>
  );
};

export default Connections;
