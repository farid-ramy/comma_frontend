import React from "react";

export default function NotFound404() {
  return (
    <div className="container-fluid">
      <br />
      <br />
      <br />
      <div className="text-center">
        <div className="error mx-auto" data-text="404">
          404
        </div>
        <p className="lead text-gray-800 mb-5">Page Not Found</p>
        <p className="text-gray-500 mb-0">It looks like you found a glitch</p>
      </div>
    </div>
  );
}
