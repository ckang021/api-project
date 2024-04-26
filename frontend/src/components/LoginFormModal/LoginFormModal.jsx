import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUser = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login({
      credential: "leslie_r",
      password: "password2"
    })).then(closeModal)
  }

  return (
    <div className='login-modal-container'>
      <h1>Log In</h1>

      <div className='login-modal-errors'>
        {errors.credential && <p>{errors.credential}</p>}
      </div>

      <form onSubmit={handleSubmit} className='login-form-container'>
        <label className='login-username'>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className='login-password'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={(credential.length < 4 || (password.length < 6))} className='login-button point'>Log In</button>
        <button onClick={demoUser} className='demo-button point'>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
