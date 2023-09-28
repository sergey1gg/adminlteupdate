import { useState } from 'react';
import { login } from '../actions/auth-api';
import $ from 'jquery';
import { Navigate } from 'react-router-dom';
export const Login = (props) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(phone, password);
      if(response.status===200){
        window.location.href="/kiosks"
      }
      else{
        showAlert()
      }
    } catch (error) {
      showAlert()
    }
  };
if (props.isLoggedIn){
  return <Navigate to="/"/>
}
  const showAlert = () => {
    $(".alert").removeClass("d-none"); // Удаляем класс "d-none", чтобы показать алерт
  };
  return (
    <div className="login-page" style={{ minHeight: "511.6px" }}>
    <div className="login-box">
      <div className="card border-top border-primary">
        <div className="card-body login-card-body">
          <div className="login-logo">
            <a className="text-primary">
              <b>Admin</b>LTE
            </a>
          </div>
          <div className="alert alert-danger alert-dismissible d-none">
            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
            <h5><i className="icon fas fa-ban" /> Alert!</h5>
            Wrong email or password. Try again.
          </div>
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="phone"
                  className="form-control"
                  placeholder="Phone"
                  value={phone}
                  onChange={handlePhoneChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </div>
              </div>
            </form>
            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p className="mb-0"></p>
          </div>
        </div>
      </div>
    </div>
  );
};
