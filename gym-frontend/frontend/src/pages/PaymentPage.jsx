import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./PaymentPage.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const planName = searchParams.get("plan") || "Standard Plan";
  const memberName = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";

  const getAmountByPlan = (plan) => {
    if (plan === "Basic Plan") return 15000;
    if (plan === "Standard Plan") return 25000;
    if (plan === "Premium Plan") return 40000;
    return 25000;
  };

  const amount = getAmountByPlan(planName);

  const [paymentData, setPaymentData] = useState({
    memberName: memberName,
    email: email,
    planName: planName,
    amount: amount,
    paymentMethod: "",
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [isPaying, setIsPaying] = useState(false);

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const paymentRecord = {
      memberName: paymentData.memberName,
      email: paymentData.email,
      planName: paymentData.planName,
      amount: Number(paymentData.amount),
      paymentMethod: paymentData.paymentMethod,
      paymentStatus: "Paid",
    };

    try {
      setIsPaying(true);

      const response = await fetch("http://localhost:8080/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentRecord),
      });

      if (!response.ok) {
        throw new Error("Payment save failed");
      }

      const savedPayment = await response.json();
      console.log("Saved Payment:", savedPayment);

      alert("Payment successful and saved to database!");
      navigate("/member-dashboard");
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Backend එක run වෙලාද බලන්න.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-overlay"></div>

      <header className="payment-navbar">
        <Link to="/" className="payment-logo">
          ANYTIME FITNESS
        </Link>

        <Link to="/enroll" className="payment-back-btn">
          BACK TO ENROLL
        </Link>
      </header>

      <main className="payment-container">
        <section className="payment-left">
          <p className="payment-tag">SECURE PAYMENT</p>

          <h1>
            COMPLETE YOUR <span>MEMBERSHIP</span> PAYMENT
          </h1>

          <p className="payment-description">
            Review your selected package and complete the payment to activate
            your gym membership.
          </p>

          <div className="payment-summary-card">
            <h2>Payment Summary</h2>

            <div className="summary-row">
              <span>Member</span>
              <strong>{paymentData.memberName || "New Member"}</strong>
            </div>

            <div className="summary-row">
              <span>Email</span>
              <strong>{paymentData.email || "Not provided"}</strong>
            </div>

            <div className="summary-row">
              <span>Plan</span>
              <strong>{paymentData.planName}</strong>
            </div>

            <div className="summary-row">
              <span>Amount</span>
              <strong>Rs. {Number(paymentData.amount).toLocaleString()}</strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>Rs. {Number(paymentData.amount).toLocaleString()}</strong>
            </div>
          </div>
        </section>

        <section className="payment-form-card">
          <h2>Payment Details</h2>
          <p className="payment-form-subtitle">
            Enter your payment information below
          </p>

          <form onSubmit={handlePayment} className="payment-form">
            <div className="payment-form-group">
              <label>Member Name</label>
              <input
                type="text"
                name="memberName"
                value={paymentData.memberName}
                onChange={handleChange}
                placeholder="Enter member name"
                required
              />
            </div>

            <div className="payment-form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={paymentData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="payment-form-group">
              <label>Payment Method</label>
              <select
                name="paymentMethod"
                value={paymentData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">Select payment method</option>
                <option value="Card">Card Payment</option>
                <option value="Cash">Cash Payment</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            {paymentData.paymentMethod === "Card" && (
              <>
                <div className="payment-form-group">
                  <label>Card Holder Name</label>
                  <input
                    type="text"
                    name="cardHolderName"
                    value={paymentData.cardHolderName}
                    onChange={handleChange}
                    placeholder="Name on card"
                    required
                  />
                </div>

                <div className="payment-form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                </div>

                <div className="payment-row">
                  <div className="payment-form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  <div className="payment-form-group">
                    <label>CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="pay-now-btn" disabled={isPaying}>
              {isPaying
                ? "PROCESSING..."
                : `PAY RS. ${Number(paymentData.amount).toLocaleString()}`}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}