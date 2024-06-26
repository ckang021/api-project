import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useNavigate } from 'react-router-dom';
import "./ProfileButton.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/')
    closeMenu();
  };

  const manageSpots = (e) => {
    e.preventDefault()
    navigate('/spots/current')
    closeMenu()
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu} className='profile point'>
        <i className='fa fa-bars bars' />
        <i className="fas fa-user-circle humanoid" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='logged-in-box'>
            <div className='top-login'>
              <li>Hello, <span className='username'>{user.username}</span>!</li>
              <li>{user.email}</li>
            </div>
            <li className='middle-login'>
              <button onClick={manageSpots} className='button-profile point'>Manage Spots</button>
            </li>
            <li className='bottom-login'>
              <button onClick={logout} className='button-profile point'>Log Out</button>
            </li>
          </div>
        ) : (
          <div className='login-signup'>
            <OpenModalMenuItem
              className='button-profile point'
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              className='button-profile point'
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
