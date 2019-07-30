import React from 'react';
export default ({ isUserAuthenticated , user}) => {
	const logout = () => {
		    window.localStorage.removeItem("user");
	}
   return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Sample-App
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="#">
            Articles
          </a>
          <a className="nav-item nav-link" href="#">
            Cms
          </a>
        </div>
        <div className="navbar-nav ml-auto d-flex">
          {isUserAuthenticated && (
            <>
              <a className=" nav-item nav-link text-success" href="#">
                {user.first_name} {user.last_name}
              </a>
              <a onClick={logout} className="  nav-item nav-link" href="#">
                sign out
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};