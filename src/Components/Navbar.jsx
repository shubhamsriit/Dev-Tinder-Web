import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../Utils/ApiEndPoints";
import { BASE_URL } from "../Utils/Constants";
import axios from "axios";
import { removeUser } from "../Store/Slices/UserSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + LOGOUT,
        {},
        {
          withCredentials: true,
        }
      );
      if (res) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="navbar bg-white shadow-sm fixed top-0 z-100">
      <div className="flex-1">
        <Link to="/feed" className="mx-3 text-xl text-black">
          DevTinder
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user?.photoUrl && <img alt="user photo" src={user?.photoUrl} />}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
