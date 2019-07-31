import React from 'react';
import {  Link } from "react-router-dom";

export default ({ isUserAuthenticated , user}) => {
	const logout = () => {
		    window.localStorage.removeItem("user");
	}
   return (
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       <Link to="/" className="navbar-brand">
         Sample-App
       </Link>
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
           <Link to="/articles" className="nav-item nav-link">
             Articles
           </Link>
           <Link to="/cms" className="nav-item nav-link">
             Add Article
           </Link>
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