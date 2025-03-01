import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () =>
{
  return (
    <nav className="padding bg-gray-800 ">
      <div className="container mx-auto flex justify-between items-center">
        <div>

          <span className="text-white text-xl font-bold">
            CodeMedic</span>
        </div>
        <div className="flex space-x-4">

          <Link to="/" className="text-white hover:text-gray-300">Debugger</Link>
          <Link to="/explainer" className="text-white hover:text-gray-300">Explainer </Link>
          <Link to="/comment" className="text-white hover:text-gray-300">Commenter </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
