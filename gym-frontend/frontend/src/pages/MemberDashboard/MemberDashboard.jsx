import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberDashboard.css";

export default function MemberDashboard() {
  const [member, setMember] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dateOfBirth: "",
  });

  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    const savedMember = localStorage.getItem("loggedInMember");

    if (savedMember) {
      const parsedMember = JSON.parse(savedMember);

      setMember(parsedMember);
      setSelectedPlan(parsedMember.membershipPlan || "Basic Plan");

      setProfileData({
        fullName: parsedMember.fullName || "",
        email: parsedMember.email || "",
        phone: parsedMember.phone || "",
        address: parsedMember.address || "",
        gender: parsedMember.gender || "",
        dateOfBirth: parsedMember.dateOfBirth || "",
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInMember");
    alert("Logged out successfully");
    navigate("/");
  };

  const handleProfileChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleProfileUpdate = async () => {
    if (!member) return;

    const updatedMember = {
      ...member,
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address,
      gender: profileData.gender,
      dateOfBirth: profileData.dateOfBirth,
      membershipPlan: selectedPlan,
    };

    try {
      const response = await fetch(
          `http://localhost:8080/api/members/${member.memberId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMember),
          }
      );

      if (response.ok) {
        const data = await response.json();

        setMember(data);
        setProfileData({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          gender: data.gender || "",
          dateOfBirth: data.dateOfBirth || "",
        });

        localStorage.setItem("loggedInMember", JSON.stringify(data));
        setIsEditing(false);

        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }
  };

  const handlePlanUpdate = async () => {
    if (!member) return;

    const updatedMember = {
      ...member,
      membershipPlan: selectedPlan,
    };

    try {
      const response = await fetch(
          `http://localhost:8080/api/members/${member.memberId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMember),
          }
      );

      if (response.ok) {
        const data = await response.json();

        setMember(data);
        setSelectedPlan(data.membershipPlan || "Basic Plan");
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

  const handleCancelEdit = () => {
    if (!member) return;

    setProfileData({
      fullName: member.fullName || "",
      email: member.email || "",
      phone: member.phone || "",
      address: member.address || "",
      gender: member.gender || "",
      dateOfBirth: member.dateOfBirth || "",
    });

    setIsEditing(false);
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

    card.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
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

            <div className="dashboard-avatar">{member.fullName?.charAt(0)}</div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-info-box">
              <div className="profile-title-row">
                <h3>Personal Information</h3>

                {!isEditing && (
                    <button
                        className="dashboard-edit-btn"
                        onClick={() => setIsEditing(true)}
                    >
                      EDIT PROFILE
                    </button>
                )}
              </div>

              {!isEditing ? (
                  <>
                    <p>
                      <strong>Full Name:</strong> {member.fullName}
                    </p>
                    <p>
                      <strong>Email:</strong> {member.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {member.phone}
                    </p>
                    <p>
                      <strong>Address:</strong> {member.address}
                    </p>
                    <p>
                      <strong>Gender:</strong> {member.gender}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> {member.dateOfBirth}
                    </p>
                  </>
              ) : (
                  <div className="profile-edit-form">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleProfileChange}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                    />

                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                    />

                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                    />

                    <label>Gender</label>
                    <select
                        name="gender"
                        value={profileData.gender}
                        onChange={handleProfileChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>

                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth}
                        onChange={handleProfileChange}
                    />

                    <div className="profile-edit-actions">
                      <button
                          className="dashboard-save-btn"
                          onClick={handleProfileUpdate}
                      >
                        SAVE PROFILE
                      </button>

                      <button
                          className="dashboard-cancel-btn"
                          onClick={handleCancelEdit}
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
              )}
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