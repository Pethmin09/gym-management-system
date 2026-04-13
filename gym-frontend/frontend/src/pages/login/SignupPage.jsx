import "./SignupPage.css";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="signup-page">
      <div className="signup-bg-glow glow-left"></div>
      <div className="signup-bg-glow glow-right"></div>

      <div className="signup-card">
        <div className="signup-brand">
          <div className="signup-logo">AF</div>
          <div>
            <h1>ANYTIME FITNESS</h1>
            <p>Create your account and start your journey.</p>
          </div>
        </div>

        <form className="signup-form">
          <div className="signup-form-grid">
            <div className="signup-input-group">
              <label>First Name</label>
              <input type="text" placeholder="Enter first name" />
            </div>

            <div className="signup-input-group">
              <label>Last Name</label>
              <input type="text" placeholder="Enter last name" />
            </div>

            <div className="signup-input-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter email" />
            </div>

            <div className="signup-input-group">
              <label>Phone Number</label>
              <input type="text" placeholder="Enter phone number" />
            </div>

            <div className="signup-input-group">
              <label>Password</label>
              <input type="password" placeholder="Create password" />
            </div>

            <div className="signup-input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm password" />
            </div>
          </div>

          <label className="terms-check">
            <input type="checkbox" />
            <span>I agree to the terms and conditions</span>
          </label>

          <button type="submit" className="signup-main-btn">
            CREATE ACCOUNT
          </button>

          <Link to="/login" className="signup-login-btn">
            BACK TO LOGIN
          </Link>
        </form>
      </div>
    </div>
  );
}