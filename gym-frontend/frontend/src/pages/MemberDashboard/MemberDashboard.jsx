import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberDashboard.css";

export default function MemberDashboard() {
  const [member, setMember] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    const savedMember = localStorage.getItem("loggedInMember");

    if (savedMember) {
      const parsedMember = JSON.parse(savedMember);
      setMember(parsedMember);
      setSelectedPlan(parsedMember.membershipPlan || "Basic Plan");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInMember");
    alert("Logged out successfully");
    navigate("/");
  };

  const handlePlanUpdate = async () => {
    if (!member) return;

    const updatedMember = {
      ...member,
      membershipPlan: selectedPlan,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/members/${member.memberId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMember),
      });

      if (response.ok) {
        const data = await response.json();
        setMember(data);
        localStorage.setItem("loggedInMember", JSON.stringify(data));
        alert("Membership plan updated successfully!");
      } else {
        alert("Failed to update membership plan");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1200px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  if (!member) {
    return <div className="dashboard-page">Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-bg-glow glow-one"></div>
      <div className="dashboard-bg-glow glow-two"></div>

      <div
        className="dashboard-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="dashboard-header">
          <div>
            <p className="dashboard-kicker">ANYTIME FITNESS</p>
            <h1>My Profile</h1>
            <p className="dashboard-subtitle">
              Manage your account details and membership plan.
            </p>
          </div>

          <div className="dashboard-avatar">
            {member.fullName?.charAt(0)}
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-info-box">
            <h3>Personal Information</h3>
            <p><strong>Full Name:</strong> {member.fullName}</p>
            <p><strong>Email:</strong> {member.email}</p>
            <p><strong>Phone:</strong> {member.phone}</p>
            <p><strong>Address:</strong> {member.address}</p>
            <p><strong>Gender:</strong> {member.gender}</p>
            <p><strong>Date of Birth:</strong> {member.dateOfBirth}</p>
          </div>

          <div className="dashboard-plan-box">
            <h3>Membership Plan</h3>
            <div className="current-plan-card">
              <span className="plan-label">Current Plan</span>
              <h2>{member.membershipPlan || "Basic Plan"}</h2>
            </div>

            <label className="plan-select-label">Change Plan</label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="plan-select"
            >
              <option value="Basic Plan">Basic Plan</option>
              <option value="Standard Plan">Standard Plan</option>
              <option value="Premium Plan">Premium Plan</option>
            </select>

            <button className="dashboard-save-btn" onClick={handlePlanUpdate}>
              UPDATE PLAN
            </button>
          </div>
        </div>

        <div className="dashboard-actions">
          <button className="dashboard-logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}