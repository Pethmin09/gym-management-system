import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./TrainersPage.css";

export default function TrainersPage() {
  const role = localStorage.getItem("role");

  if (role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  const API_URL = "http://localhost:8080/api/trainers";

  const [trainers, setTrainers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    specialization: "",
    workingHours: "",
    salary: "",
    experience: "",
    photoUrl: "",
  });

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch trainers");
      }

      const data = await response.json();
      setTrainers(data);
      setMessage("");
    } catch (error) {
      console.error("Fetch trainers error:", error);
      setMessage("Backend connect වෙලා නැහැ. Backend run කරලා try කරන්න.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      fullName: "",
      phone: "",
      address: "",
      gender: "",
      dateOfBirth: "",
      specialization: "",
      workingHours: "",
      salary: "",
      experience: "",
      photoUrl: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trainerData = {
      ...formData,
      salary: Number(formData.salary),
      experience: Number(formData.experience),
    };

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trainerData),
        }
      );

      if (!response.ok) {
        throw new Error("Trainer save failed");
      }

      setMessage(
        editingId
          ? "Trainer updated successfully!"
          : "Trainer added successfully!"
      );

      resetForm();
      fetchTrainers();
    } catch (error) {
      console.error("Save trainer error:", error);
      setMessage("Trainer save කරන්න බැරි වුණා. Backend check කරන්න.");
    }
  };

  const handleEdit = (trainer) => {
    setEditingId(trainer.trainerId || trainer.id);

    setFormData({
      fullName: trainer.fullName || "",
      phone: trainer.phone || "",
      address: trainer.address || "",
      gender: trainer.gender || "",
      dateOfBirth: trainer.dateOfBirth || "",
      specialization: trainer.specialization || "",
      workingHours: trainer.workingHours || "",
      salary: trainer.salary || "",
      experience: trainer.experience || "",
      photoUrl: trainer.photoUrl || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (trainer) => {
    const id = trainer.trainerId || trainer.id;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trainer?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Trainer delete failed");
      }

      setMessage("Trainer deleted successfully!");
      fetchTrainers();
    } catch (error) {
      console.error("Delete trainer error:", error);
      setMessage("Trainer delete කරන්න බැරි වුණා. Backend check කරන්න.");
    }
  };

  return (
    <div className="trainer-crud-page">
      <div className="trainer-bg-glow"></div>

      <header className="trainer-page-header">
        <Link to="/admin-dashboard" className="trainer-back-link">
          ← Back to Admin Dashboard
        </Link>

        <div>
          <p className="trainer-top-title">TRAINER CRUD</p>
          <h1>Trainer Management</h1>
          <p className="trainer-subtitle">
            Add, view, update, and delete gym trainers.
          </p>
        </div>
      </header>

      {message && <div className="trainer-message">{message}</div>}

      <section className="trainer-crud-layout">
        <form className="trainer-form-card" onSubmit={handleSubmit}>
          <h2>{editingId ? "Update Trainer" : "Add New Trainer"}</h2>

          <div className="trainer-form-grid">
            <div className="trainer-form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="trainer-form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="trainer-form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="trainer-form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="trainer-form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="trainer-form-group">
              <label>Specialization</label>
              <input
                type="text"
                name="specialization"
                placeholder="Strength, Yoga, Cardio..."
                value={formData.specialization}
                onChange={handleChange}
                required
              />
            </div>

            <div className="trainer-form-group">
              <label>Working Hours</label>
              <input
                type="text"
                name="workingHours"
                placeholder="6.00 AM - 2.00 PM"
                value={formData.workingHours}
                onChange={handleChange}
                required
              />
            </div>

            <div className="trainer-form-group">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                placeholder="Enter salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>

            <div className="trainer-form-group">
              <label>Experience</label>
              <input
                type="number"
                name="experience"
                placeholder="Years"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>

            <div className="trainer-form-group">
              <label>Photo URL</label>
              <input
                type="text"
                name="photoUrl"
                placeholder="Enter trainer photo URL"
                value={formData.photoUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="trainer-form-actions">
            <button type="submit" className="trainer-submit-btn">
              {editingId ? "UPDATE TRAINER" : "ADD TRAINER"}
            </button>

            {editingId && (
              <button
                type="button"
                className="trainer-cancel-btn"
                onClick={resetForm}
              >
                CANCEL
              </button>
            )}
          </div>
        </form>

        <section className="trainer-list-card">
          <div className="trainer-list-header">
            <h2>Trainer List</h2>
            <button onClick={fetchTrainers} className="refresh-btn">
              Refresh
            </button>
          </div>

          {trainers.length === 0 ? (
            <p className="empty-text">
              No trainers found. Add a new trainer or check backend connection.
            </p>
          ) : (
            <div className="trainer-table-wrap">
              <table className="trainer-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Specialization</th>
                    <th>Hours</th>
                    <th>Salary</th>
                    <th>Experience</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {trainers.map((trainer) => (
                    <tr key={trainer.trainerId || trainer.id}>
                      <td>
                        {trainer.photoUrl ? (
                          <img
                            src={trainer.photoUrl}
                            alt={trainer.fullName}
                            className="trainer-table-img"
                          />
                        ) : (
                          <span className="trainer-no-photo">No Photo</span>
                        )}
                      </td>
                      <td>{trainer.fullName}</td>
                      <td>{trainer.phone}</td>
                      <td>{trainer.specialization}</td>
                      <td>{trainer.workingHours}</td>
                      <td>Rs. {Number(trainer.salary).toLocaleString()}</td>
                      <td>{trainer.experience} years</td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(trainer)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(trainer)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </div>
  );
}