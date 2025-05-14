import { useSelector } from "react-redux";

const Loader = () => {
  const loading = useSelector((state) => state.loading.loading);
  return loading ? (
    <div className="loader">
      <div className="flex rounded p-3 bg-white items-center justify-center space-x-2 shadow-md">
        <div>
          <span className="loading loading-ball loading-xs text-neutral"></span>
          <span className="loading loading-ball loading-sm text-neutral"></span>
        </div>
        <span className="text-black text-xl font-bold">Loading</span>
      </div>
    </div>
  ) : null;
};

export default Loader;
