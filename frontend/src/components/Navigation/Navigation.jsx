import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import logo from "./nav-logo.png"

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ?
    (
     <>
       <li>
        <ProfileButton user={sessionUser} />
      </li>
      <li>
        <NavLink to='/spots/new'>Create New Spot</NavLink>
      </li>
     </>
    ) : (
      <>
        <ProfileButton />
      </>
    );

  return (
    <ul>
      <div className='nav-bar'>
        <NavLink to="/" className='icon-container point'>
          <img className='home-icon' src={logo} />
        </NavLink>
        <li className='nav-bar-right'>
          {isLoaded && sessionLinks}
        </li>
      </div>
    </ul>
  );
}

export default Navigation;
