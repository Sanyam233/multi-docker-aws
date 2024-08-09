import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="mb-10 border border-solid border-1 flex justify-center p-2">
      <ul className="flex gap-x-4">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/other-page">Other Page</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
