import "./SignupPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignupPage() {
  const [member, setMember] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    membershipPlan: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setMember({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      dateOfBirth: "",
      membershipPlan: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (member.password !== member.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const memberData = {
      fullName: member.fullName,
      email: member.email,
      phone: member.phone,
      address: member.address,
      gender: member.gender,
      dateOfBirth: member.dateOfBirth,
      membershipPlan: member.membershipPlan,
      password: member.password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });

      if (response.ok) {
        alert("Member registered successfully!");
        resetForm();
      } else {
        const errorText = await response.text();
        console.error("Register failed:", errorText);
        alert("Failed to register member");
      }
    } catch (error) {
      console.error("Backend connection error:", error);
      alert("Error connecting to backend");
    }
  };

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

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-form-grid">
            <div className="signup-input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={member.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={member.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-input-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={member.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-input-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                value={member.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-input-group">
              <label>Gender</label>
              <select
                name="gender"
                value={member.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="signup-input-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={member.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-input-group">
              <label>Membership Plan</label>
              <select
                name="membershipPlan"
                value={member.membershipPlan}
                onChange={handleChange}
                required
              >
                <option value="">Select plan</option>
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Elite">Elite</option>
              </select>
            </div>

            <div className="signup-input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={member.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={member.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label className="terms-check">
            <input type="checkbox" required />
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