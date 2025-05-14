import React from "react";
import {getCookie1} from "../Utils/CommonMethods";

const ProtectedRoute = (props) => {
  const { Component } = props;
  const [showComponent, setShowComponent] = React.useState(false);
  React.useEffect(() => {
    if (!getCookie1("token")) {
        setShowComponent(false);
        window.location.href = "/login";
    }
    else{
        setShowComponent(true);
    }
  }, []);
  return (
    showComponent && <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;