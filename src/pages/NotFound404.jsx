import React from "react";

/**
 * Component for rendering a 404 Not Found page.
 * Displays a message indicating that the page is not found.
 */
const NotFound404 = () => {
  return (
    <div className="container-fluid">
      {/* Empty space for better layout */}
      <br />
      <br />
      <br />
      <div className="text-center">
        {/* 404 error text */}
        <div className="error mx-auto" data-text="404">
          404
        </div>
        {/* Lead text indicating the page is not found */}
        <p className="lead text-gray-800 mb-5">Page Not Found</p>
        {/* Additional information */}
        <p className="text-gray-500 mb-0">It looks like you found a glitch</p>
      </div>
    </div>
  );
};

export default NotFound404;
