import React from "react";

const Error = ({ err }) => {
  return (
    <div className="errorMessage">
      An error occurred - "{err.message}".
    </div>
  );
};

export default Error;
