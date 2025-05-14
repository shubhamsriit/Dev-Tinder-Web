import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import store from "./Store/AppStore";
const Conatiner = React.lazy(() => import("./Components/Container"));
const Feed = React.lazy(() => import("./Components/Feed"));
const Profile = React.lazy(() => import("./Components/Profile"));
const Connections = React.lazy(() => import("./Components/Connections"));
const Requests = React.lazy(() => import("./Components/Requests"));
import Loader from "./Components/Loader";
import "./Interceptor/AppInterceptor";
import Signup from "./Components/Signup";
import ErrorDialog from "./Components/SuccessOrErrorDialog";
import ProtectedRoute from "./Navigation/ProtectedRoute";
import { SnackbarProvider } from "./Context/SnackBarProvider";


function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider>
      <div className="w-full">
        <Loader />
        <BrowserRouter basename="/">
          <ErrorDialog />
          <Routes>
            <Route
              path="/"
              element={
                <React.Suspense fallback={<Loader />}>
                  <ProtectedRoute Component={Conatiner} />
                </React.Suspense>
              }
            >
              <Route
                path="/feed"
                element={
                  <React.Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={Feed} />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <React.Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={Profile} />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="/connections"
                element={
                  <React.Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={Connections} />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="/requests"
                element={
                  <React.Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={Requests} />
                  </React.Suspense>
                }
              ></Route>
            </Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
