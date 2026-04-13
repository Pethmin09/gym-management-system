import { useEffect, useRef, useState } from "react";

export default function GymWebsite() {
  const videoId = "RJ1izzADlzY";
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);

  const [activeDay, setActiveDay] = useState("MONDAY");

  const scheduleData = {
    MONDAY: [
      { className: "CARDIO", time: "6.00 AM - 6.30 AM", trainer: "John Carter" },
      { className: "CROSS FIT", time: "6.30 AM - 7.00 AM", trainer: "Sophie Moore" },
      { className: "RUNNING", time: "7.00 AM - 7.30 AM", trainer: "Dan Clark" },
      { className: "CYCLING", time: "7.30 AM - 8.00 AM", trainer: "Emma Lewis" },
    ],
    TUESDAY: [
      { className: "CARDIO", time: "6.00 AM - 6.30 AM", trainer: "Sophie Moore" },
      { className: "CROSS FIT", time: "6.30 AM - 7.00 AM", trainer: "Dan Clark" },
      { className: "RUNNING", time: "7.00 AM - 7.30 AM", trainer: "Emma Lewis" },
      { className: "CYCLING", time: "7.30 AM - 8.00 AM", trainer: "John Carter" },
    ],
    WEDNESDAY: [
      { className: "CARDIO", time: "6.00 AM - 6.30 AM", trainer: "Dan Clark" },
      { className: "CROSS FIT", time: "6.30 AM - 7.00 AM", trainer: "Emma Lewis" },
      { className: "RUNNING", time: "7.00 AM - 7.30 AM", trainer: "John Carter" },
      { className: "CYCLING", time: "7.30 AM - 8.00 AM", trainer: "Sophie Moore" },
    ],
    THURSDAY: [
      { className: "CARDIO", time: "6.00 AM - 6.30 AM", trainer: "Emma Lewis" },
      { className: "CROSS FIT", time: "6.30 AM - 7.00 AM", trainer: "John Carter" },
      { className: "RUNNING", time: "7.00 AM - 7.30 AM", trainer: "Sophie Moore" },
      { className: "CYCLING", time: "7.30 AM - 8.00 AM", trainer: "Dan Clark" },
    ],
    FRIDAY: [
      { className: "CARDIO", time: "6.00 AM - 6.30 AM", trainer: "John Carter" },
      { className: "CROSS FIT", time: "6.30 AM - 7.00 AM", trainer: "Emma Lewis" },
      { className: "RUNNING", time: "7.00 AM - 7.30 AM", trainer: "Dan Clark" },
      { className: "CYCLING", time: "7.30 AM - 8.00 AM", trainer: "Sophie Moore" },
    ],
    SATURDAY: [
      { className: "CARDIO", time: "6.00 AM - 6.30 AM", trainer: "Sophie Moore" },
      { className: "CROSS FIT", time: "6.30 AM - 7.00 AM", trainer: "John Carter" },
      { className: "RUNNING", time: "7.00 AM - 7.30 AM", trainer: "Emma Lewis" },
      { className: "CYCLING", time: "7.30 AM - 8.00 AM", trainer: "Dan Clark" },
    ],
    SUNDAY: [
      { className: "CARDIO", time: "6.00 AM - 6.30 AM", trainer: "Emma Lewis" },
      { className: "CROSS FIT", time: "6.30 AM - 7.00 AM", trainer: "Dan Clark" },
      { className: "RUNNING", time: "7.00 AM - 7.30 AM", trainer: "Sophie Moore" },
      { className: "CYCLING", time: "7.30 AM - 8.00 AM", trainer: "John Carter" },
    ],
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-up, .reveal-card, .service-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const glow1 = glow1Ref.current;
    const glow2 = glow2Ref.current;

    if (!hero || !content || !glow1 || !glow2) return;

    const handleMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) / centerX;
      const moveY = (y - centerY) / centerY;

      content.style.transform = `
        perspective(1200px)
        rotateY(${moveX * 5}deg)
        rotateX(${moveY * -4}deg)
        translateZ(20px)
      `;

      glow1.style.transform = `translate(${moveX * 18}px, ${moveY * 18}px)`;
      glow2.style.transform = `translate(${moveX * -22}px, ${moveY * -22}px)`;
    };

    const resetMove = () => {
      content.style.transform = `
        perspective(1200px)
        rotateY(0deg)
        rotateX(0deg)
        translateZ(0px)
      `;
      glow1.style.transform = `translate(0, 0)`;
      glow2.style.transform = `translate(0, 0)`;
    };

    hero.addEventListener("mousemove", handleMove);
    hero.addEventListener("mouseleave", resetMove);

    return () => {
      hero.removeEventListener("mousemove", handleMove);
      hero.removeEventListener("mouseleave", resetMove);
    };
  }, []);

  return (
    <div className="home-page">
      <section className="video-hero" ref={heroRef}>
        <div className="video-wrapper">
          <iframe
            className="video-bg"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1`}
            title="Gym Background Video"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>

        <div className="video-overlay"></div>
        <div className="video-blur"></div>
        <div className="hero-floating-glow glow-one" ref={glow1Ref}></div>
        <div className="hero-floating-glow glow-two" ref={glow2Ref}></div>

        <header className="hero-navbar">
          <div className="brand-wrap">
            <div className="brand-logo">
              <span>AF</span>
            </div>

            <div className="brand-text">
              <div className="logo">ANYTIME FITNESS</div>
              <p className="brand-subtitle">Train Strong. Live Better.</p>
            </div>
          </div>

          <nav className="hero-nav">
            <a href="#about">About Us</a>
            <a href="#equipment">Equipment Inventory</a>
            <a href="#trainers">Trainers</a>
            <a href="#workouts">Workout Schedules / Diets</a>
          </nav>

          <a href="/login" className="call-btn">
            SIGN UP / LOGIN
          </a>
        </header>

        <div className="hero-content" ref={contentRef}>
          <p className="hero-tag reveal-up">SHAPE YOUR BODY</p>

          <h1 className="hero-title reveal-up delay-1">
            <span className="white">BE </span>
            <span className="red">STRONG</span>
            <br />
            <span className="white">WITH A</span>
            <br />
            <span className="white">PROFESSIONAL</span>
          </h1>

          <p className="hero-description reveal-up delay-2">
            Achieve your goals with expert guidance, premium equipment, smart
            workout plans, and personalized diet support built for real results.
          </p>

          <div className="hero-buttons reveal-up delay-3">
            <a href="#membership" className="about-btn">
              MEMBERSHIP PLANS
            </a>
            <a href="#workouts" className="outline-btn">
              CONTACT US
            </a>
          </div>

          <div className="hero-stats reveal-up delay-3">
            <div className="stat-box tilt-card">
              <h3>24/7</h3>
              <p>Gym Access</p>
            </div>
            <div className="stat-box tilt-card">
              <h3>50+</h3>
              <p>Machines & Equipment</p>
            </div>
            <div className="stat-box tilt-card">
              <h3>10+</h3>
              <p>Certified Trainers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section" id="about">
        <div className="why-header reveal-up">
          <p className="why-top-title">WHY CHOOSE US?</p>
          <h2 className="why-main-title">PUSH YOUR LIMITS FORWARD</h2>
        </div>

        <div className="why-grid">
          <div className="why-card reveal-card delay-1 tilt-card">
            <div className="icon-circle">
              <span>🏋️</span>
            </div>
            <h3>Modern equipment</h3>
            <p>
              Our gym is equipped with the latest state-of-the-art fitness
              machines and technology, designed to deliver maximum performance
              and safety.
            </p>
          </div>

          <div className="why-card reveal-card delay-2 tilt-card">
            <div className="icon-circle">
              <span>🥗</span>
            </div>
            <h3>Healthy nutrition plan</h3>
            <p>
              With personalized nutrition plans and healthy guidance, you get
              the fuel your body needs to perform and recover better.
            </p>
          </div>

          <div className="why-card reveal-card delay-3 tilt-card">
            <div className="icon-circle">
              <span>💪</span>
            </div>
            <h3>Professional training plan</h3>
            <p>
              Our certified trainers create structured, results-driven programs
              that help you improve strength, endurance, and body transformation.
            </p>
          </div>

          <div className="why-card reveal-card delay-4 tilt-card">
            <div className="icon-circle">
              <span>❤️</span>
            </div>
            <h3>Unique to your needs</h3>
            <p>
              Everything we offer is tailored to your goals, body type, and
              lifestyle for better, faster, and more sustainable results.
            </p>
          </div>
        </div>
      </section>

      <section className="services-section" id="equipment">
        <div className="services-heading service-reveal">
          <p className="services-top-title">SERVICE WE OFFER</p>
          <h2 className="services-main-title">TRAIN SMART. MOVE BETTER. LIVE STRONGER.</h2>
        </div>

        <div className="services-card-grid">
          <div className="service-offer-card service-reveal delay-1 tilt-card">
            <div className="service-offer-image">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
                alt="1 on 1 training"
              />
            </div>
            <div className="service-offer-label">1-ON-1 TRAINING</div>
          </div>

          <div className="service-offer-card service-reveal delay-2 tilt-card">
            <div className="service-offer-image">
              <img
                src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=80"
                alt="elderly training"
              />
            </div>
            <div className="service-offer-label">ELDERLY TRAINING</div>
          </div>

          <div className="service-offer-card service-reveal delay-3 tilt-card">
            <div className="service-offer-image">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80"
                alt="pre and postnatal training"
              />
            </div>
            <div className="service-offer-label">PRE &amp; POSTNATAL TRAINING</div>
          </div>

          <div className="service-offer-card service-reveal delay-4 tilt-card">
            <div className="service-offer-image">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
                alt="body conditioning training"
              />
            </div>
            <div className="service-offer-label">BODY CONDITIONING</div>
          </div>

          <div className="service-offer-card service-reveal delay-3 tilt-card">
            <div className="service-offer-image">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80"
                alt="rehabilitation"
              />
            </div>
            <div className="service-offer-label">MUSCLE REHAB</div>
          </div>

          <div className="service-offer-card service-reveal delay-2 tilt-card">
            <div className="service-offer-image">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80"
                alt="workout plans"
              />
            </div>
            <div className="service-offer-label">WORKOUT PLANS</div>
          </div>
        </div>
      </section>

      <section className="pricing-section" id="membership">
        <div className="pricing-header service-reveal">
          <p className="pricing-top-title">MEMBERSHIP PACKAGES</p>
          <h2>CHOOSE YOUR FITNESS PACKAGE</h2>
          <p className="pricing-subtext">
            Pick the membership that matches your goals, schedule, and training style.
          </p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card service-reveal delay-1 tilt-card">
            <h3>BASIC PLAN</h3>
            <div className="pricing-price">Rs. 15,000</div>
            <div className="pricing-location">STARTER PACKAGE</div>
            <ul className="pricing-features">
              <li>Gym access 5 days a week</li>
              <li>Basic workout guidance</li>
              <li>Locker facility</li>
              <li>Body assessment</li>
              <li>Standard support</li>
            </ul>
            <a href="#auth" className="pricing-enroll-btn">ENROLL NOW</a>
          </div>

          <div className="pricing-card featured service-reveal delay-2 tilt-card">
            <h3>STANDARD PLAN</h3>
            <div className="pricing-price">Rs. 25,000</div>
            <div className="pricing-location">MOST POPULAR</div>
            <ul className="pricing-features">
              <li>Full gym access 7 days</li>
              <li>Personal trainer support</li>
              <li>Workout schedules</li>
              <li>Diet recommendations</li>
              <li>Body assessment</li>
              <li>Priority support</li>
            </ul>
            <a href="#auth" className="pricing-enroll-btn">ENROLL NOW</a>
          </div>

          <div className="pricing-card service-reveal delay-3 tilt-card">
            <h3>PREMIUM PLAN</h3>
            <div className="pricing-price">Rs. 40,000</div>
            <div className="pricing-location">ADVANCED PACKAGE</div>
            <ul className="pricing-features">
              <li>Unlimited gym access</li>
              <li>Dedicated trainer</li>
              <li>Custom diet plan</li>
              <li>Advanced workout program</li>
              <li>Steam / sauna access</li>
              <li>Premium support</li>
            </ul>
            <a href="#auth" className="pricing-enroll-btn">ENROLL NOW</a>
          </div>
        </div>
      </section>

      <section className="trainers-section" id="trainers">
        <div className="trainers-bg-text service-reveal">TRAINERS</div>

        <div className="trainers-header service-reveal">
          <p className="trainers-top-title">OUR TRAINERS</p>
          <h2>MEET OUR EXPERT FITNESS COACHES</h2>
          <p className="trainers-subtext">
            Train with experienced coaches who will guide, motivate, and transform
            your fitness journey with professional support.
          </p>
        </div>

        <div className="trainers-grid">
          <div className="trainer-card service-reveal delay-1 tilt-card">
            <div className="trainer-image-wrap">
              <img src="/images/JOHNCARTER.jpg" alt="John Carter" />
              <button className="trainer-plus-btn">+</button>
            </div>
            <h3>JOHN CARTER</h3>
            <p>STRENGTH COACH</p>
          </div>

          <div className="trainer-card service-reveal delay-2 tilt-card">
            <div className="trainer-image-wrap">
              <img src="/images/sophie.avif" alt="Sophie Moore" />
              <button className="trainer-plus-btn">+</button>
            </div>
            <h3>SOPHIE MOORE</h3>
            <p>FITNESS COACH</p>
          </div>

          <div className="trainer-card service-reveal delay-3 tilt-card">
            <div className="trainer-image-wrap">
              <img src="/images/DANCLARK.jpg" alt="Dan Clark" />
              <button className="trainer-plus-btn">+</button>
            </div>
            <h3>DAN CLARK</h3>
            <p>CARDIO SPECIALIST</p>
          </div>

          <div className="trainer-card service-reveal delay-4 tilt-card">
            <div className="trainer-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=900&q=80"
                alt="Emma Lewis"
              />
              <button className="trainer-plus-btn">+</button>
            </div>
            <h3>EMMA LEWIS</h3>
            <p>YOGA TRAINER</p>
          </div>
        </div>

        <div className="trainers-action service-reveal delay-4">
          <a href="#auth" className="browse-trainers-btn">BROWSE TRAINERS</a>
        </div>
      </section>

      <section className="schedule-section" id="workouts">
        <div className="schedule-header service-reveal">
          <p className="schedule-top-title">OUR CLASSES</p>
          <h2>CLASS TIME TABLE</h2>
          <p className="schedule-subtitle">
            Explore our weekly classes and train with the right coach at the right time.
          </p>
        </div>

        <div className="schedule-days service-reveal delay-1">
          {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map((day) => (
            <button
              key={day}
              className={`schedule-day-btn ${activeDay === day ? "active" : ""}`}
              onClick={() => setActiveDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="schedule-list">
          {scheduleData[activeDay].map((item, index) => (
            <div
              key={`${activeDay}-${item.className}`}
              className={`schedule-row tilt-card day-row-${index + 1}`}
            >
              <div className="schedule-class">{item.className}</div>
              <div className="schedule-time">{item.time}</div>
              <div className="schedule-trainer">{item.trainer}</div>
              <a href="#auth" className="schedule-call-btn">
                BOOK NOW
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="reviews-section" id="reviews">
        <div className="reviews-bg-text service-reveal">REVIEWS</div>

        <div className="reviews-header service-reveal">
          <p className="reviews-top-title">TESTIMONIALS</p>
          <h2>WHAT OUR MEMBERS SAY</h2>
          <p className="reviews-subtext">
            Real feedback from members who transformed their strength, confidence,
            and lifestyle with Anytime Fitness.
          </p>
        </div>

        <div className="reviews-grid">
          <div className="review-card service-reveal delay-1 tilt-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              Joining Anytime Fitness was the best decision I made for my health.
              The trainers are supportive, the environment is motivating, and I feel
              stronger every week.
            </p>
            <div className="review-user">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                alt="Amanda Perera"
              />
              <div>
                <h3>AMANDA PERERA</h3>
                <span>FITNESS MEMBER</span>
              </div>
            </div>
          </div>

          <div className="review-card featured-review service-reveal delay-2 tilt-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              The custom workout plans and coaching completely changed my routine.
              I’ve lost weight, built muscle, and gained so much confidence in just a
              few months.
            </p>
            <div className="review-user">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
                alt="Kasun Silva"
              />
              <div>
                <h3>KASUN SILVA</h3>
                <span>PREMIUM MEMBER</span>
              </div>
            </div>
          </div>

          <div className="review-card service-reveal delay-3 tilt-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              I love the energy here. The coaches push you in the best way, and the
              classes are always exciting. It feels like a second family.
            </p>
            <div className="review-user">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80"
                alt="Nadeesha Fernando"
              />
              <div>
                <h3>NADEESHA FERNANDO</h3>
                <span>CLASS MEMBER</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-section" id="contact">
        <div className="contact-bg-text service-reveal">CONTACT</div>

        <div className="contact-header service-reveal">
          <p className="contact-top-title">GET IN TOUCH</p>
          <h2>START YOUR FITNESS JOURNEY TODAY</h2>
          <p className="contact-subtext">
            Reach out to us for memberships, training support, workout guidance, and
            personalized fitness help.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-card service-reveal delay-1 tilt-card">
            <h3>CONTACT DETAILS</h3>

            <div className="contact-info-item">
              <span className="contact-label">Phone</span>
              <p>+94 77 123 4567</p>
            </div>

            <div className="contact-info-item">
              <span className="contact-label">Email</span>
              <p>support@anytimefitness.lk</p>
            </div>

            <div className="contact-info-item">
              <span className="contact-label">Location</span>
              <p>Colombo 07, Sri Lanka</p>
            </div>

            <div className="contact-info-item">
              <span className="contact-label">Opening Hours</span>
              <p>Mon - Sun : 5.00 AM - 11.00 PM</p>
            </div>
          </div>

          <form className="contact-form-card service-reveal delay-2 tilt-card">
            <h3>SEND US A MESSAGE</h3>

            <div className="contact-form-grid">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Email Address" />
              <input type="text" placeholder="Phone Number" />
              <input type="text" placeholder="Subject" />
            </div>

            <textarea placeholder="Write your message here..."></textarea>

            <button type="submit" className="contact-submit-btn">
              SEND MESSAGE
            </button>
          </form>
        </div>

        <footer className="site-footer service-reveal delay-3">
          <div className="footer-brand">
            <div className="footer-logo">AF</div>
            <div>
              <h3>ANYTIME FITNESS</h3>
              <p>Train Strong. Live Better.</p>
            </div>
          </div>

          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#equipment">Services</a>
            <a href="#membership">Packages</a>
            <a href="#trainers">Trainers</a>
            <a href="#workouts">Schedules</a>
            <a href="#reviews">Reviews</a>
          </div>

          <p className="footer-copy">© 2026 Anytime Fitness. All Rights Reserved.</p>
        </footer>
      </section>
    </div>
  );
}