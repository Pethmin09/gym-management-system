import "./ForgotPasswordPage.css";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <div className="forgot-page">
      <div className="forgot-bg-image"></div>
      <div className="forgot-bg-overlay"></div>
      <div className="forgot-glow forgot-glow-1"></div>
      <div className="forgot-glow forgot-glow-2"></div>

      <div className="forgot-content">
        <div className="forgot-left">
          <p className="forgot-kicker">PASSWORD RECOVERY</p>
          <h1>
            RESET YOUR
            <br />
            <span>ACCESS</span>
          </h1>
          <p className="forgot-left-text">
            Enter your email address and we will send you a password reset link
            so you can get back to your fitness journey.
          </p>
        </div>

        <div className="forgot-right">
          <div className="forgot-form-wrap">
            <div className="forgot-brand-row">
              <div className="forgot-logo-box">AF</div>
              <div>
                <h2>Forgot Password?</h2>
                <p>We will send a reset link to your email</p>
              </div>
            </div>

            <form className="forgot-form">
              <div className="forgot-field">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" />
              </div>

              <Link to="/reset-password" className="forgot-main-btn">
                SEND RESET LINK
              </Link>

              <Link to="/login" className="forgot-back-btn">
                BACK TO LOGIN
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}