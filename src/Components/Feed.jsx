import { useDispatch, useSelector } from "react-redux";
import { GET_FEED } from "../Utils/ApiEndPoints";
import { BASE_URL } from "../Utils/Constants";
import { addFeed } from "../Store/Slices/FeedSlice";
import { useEffect } from "react";
import axios from "axios";
import FeedCard from "./FeedCard";

const Feed = () => {
  const feedList = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + GET_FEED, {
        withCredentials: true,
      });
      if (res) {
        dispatch(addFeed(res.data.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex flex-wrap justify-center my-4 gap-4 pb-20">
      {feedList?.length > 0 &&
        feedList.map((user) => {
          return (
            <FeedCard
              key={user._id}
              id={user._id}
              firstName={user?.firstName}
              lastName={user?.lastName}
              photoUrl={user?.photoUrl}
              about={user?.about}
              handleSemdRequest={getFeed}
            />
          );
        })}
    </div>
  );
};

export default Feed;
