import "./LoginPage.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="login-page-modern">
      <div className="login-bg-image"></div>
      <div className="login-bg-overlay"></div>
      <div className="login-bg-glow login-glow-1"></div>
      <div className="login-bg-glow login-glow-2"></div>

      <div className="login-page-content">
        <div className="login-left-content">
          <p className="login-kicker">ANYTIME FITNESS</p>
          <h1>
            PUSH YOUR
            <br />
            <span>LIMITS</span>
          </h1>
          <p className="login-left-text">
            Train with expert coaches, premium equipment, and a fitness
            environment built to transform your body and mindset.
          </p>

          <div className="login-mini-stats">
            <div className="mini-stat">
              <h3>24/7</h3>
              <p>Gym Access</p>
            </div>
            <div className="mini-stat">
              <h3>50+</h3>
              <p>Equipment</p>
            </div>
            <div className="mini-stat">
              <h3>10+</h3>
              <p>Trainers</p>
            </div>
          </div>
        </div>

        <div className="login-right-panel">
          <div className="login-form-wrap">
            <div className="login-brand-row">
              <div className="login-logo-box">AF</div>
              <div>
                <h2>Welcome Back</h2>
                <p>Login to continue your fitness journey</p>
              </div>
            </div>

            <form className="login-form-modern">
              <div className="login-field">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" />
              </div>

              <div className="login-field">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" />
              </div>

              <div className="login-row">
                <label className="remember-row">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

               <Link to="/forgot-password" className="forgot-link-modern">
                 Forgot Password?
               </Link>
              </div>

              <button type="submit" className="login-main-btn">
                LOGIN
              </button>

              <Link to="/signup" className="create-account-btn">
                CREATE ACCOUNT
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}