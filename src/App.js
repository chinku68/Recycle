// Waste-to-Resource Website Prototype (No Tailwind)
// Single-file React component + external CSS (waste.css)
// Steps:
// 1) Place this as src/App.jsx (or src/App.tsx) in your React app
// 2) Create src/waste.css with the styles I provide in a separate file
// 3) Ensure index.jsx/tsx renders <App />

import React, { useState, useEffect } from "react";
import "./waste.css";

export default function App() {
  // Mock impact counters (would be fetched from backend in real app)
  const [impact, setImpact] = useState({
    foodBiogasKg: 12500,
    plasticRoadKg: 3200,
    flyAshBricks: 8600,
  });

  // Citizen dashboard state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("wtr_user");
    return saved ? JSON.parse(saved) : { name: "Guest", credits: 120, contributedKg: 18 };
  });

  const [leadboard] = useState([
    { name: "Green Colony A", points: 1200 },
    { name: "Eco Park Society", points: 980 },
    { name: "Starlight Apartments", points: 820 },
  ]);

  const [products] = useState([
    { id: 1, title: "FlyAsh Brick (Standard)", price: "₹12/pc", description: "Durable eco-brick for construction" },
    { id: 2, title: "Compost Bag (5kg)", price: "₹80", description: "Rich organic compost from community hubs" },
    { id: 3, title: "Biodegradable Plate (10 pcs)", price: "₹60", description: "Disposable plates made from bio-polymers" },
  ]);

  // Contribution form
  const [contribKg, setContribKg] = useState(2);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("wtr_user", JSON.stringify(user));
  }, [user]);

  function handleContribute(e) {
    e.preventDefault();
    const kg = Number(contribKg) || 0;
    if (kg <= 0) {
      setStatusMessage("Enter a positive amount of kg to contribute.");
      return;
    }

    // Update mock impact & user credits
    setImpact((prev) => ({
      ...prev,
      foodBiogasKg: prev.foodBiogasKg + Math.round(kg * 0.6),
      plasticRoadKg: prev.plasticRoadKg + Math.round(kg * 0.2),
      flyAshBricks: prev.flyAshBricks + Math.round(kg * 0.1),
    }));

    const earned = Math.round(kg * 5); // 5 credits per kg
    setUser((prev) => ({ ...prev, credits: prev.credits + earned, contributedKg: prev.contributedKg + kg }));
    setStatusMessage(`Thanks! You earned ${earned} Green Credits.`);
  }

  function redeemCredits(amount) {
    if (user.credits < amount) {
      setStatusMessage("Not enough credits to redeem.");
      return;
    }
    setUser((prev) => ({ ...prev, credits: prev.credits - amount }));
    setStatusMessage(`Redeemed ${amount} credits. Enjoy your discount!`);
  }

  // Static GPS tracking data
  const vehicles = [
    { id: 1, name: "Truck A", lat: 17.385, lng: 78.486, status: "Active" },
    { id: 2, name: "Truck B", lat: 17.4, lng: 78.48, status: "Idle" },
    { id: 3, name: "Truck C", lat: 17.395, lng: 78.5, status: "Active" },
  ];

  // Map projection helper (simple scaling around a base lat/lng)
  function project(lat, lng) {
    const latBase = 17.38;
    const lngBase = 78.47;
    const scale = 5000; // adjust scaling factor
    return {
      x: (lng - lngBase) * scale,
      y: (latBase - lat) * scale,
    };
  }

  // --- Developer Test Panel (inline smoke tests) ---
  function runDevTests() {
    const tests = [];

    // Test 1: projection returns finite numbers
    const p = project(17.385, 78.486);
    tests.push({ name: "project() returns finite numbers", passed: Number.isFinite(p.x) && Number.isFinite(p.y), details: `x=${p.x.toFixed(2)}, y=${p.y.toFixed(2)}`});

    // Test 2: vehicles IDs are unique
    const ids = vehicles.map((v) => v.id);
    const uniqueIds = new Set(ids);
    tests.push({ name: "vehicles have unique ids", passed: uniqueIds.size === ids.length, details: `ids=[${ids.join(", ")}]`});

    // Test 3: vehicle fields are valid
    const allValid = vehicles.every((v) => typeof v.lat === "number" && typeof v.lng === "number" && ["Active", "Idle"].includes(v.status));
    tests.push({ name: "vehicle fields valid", passed: allValid, details: allValid ? "ok" : "invalid entries" });

    // Test 4: impact counters non-negative
    const nonNeg = impact.foodBiogasKg >= 0 && impact.plasticRoadKg >= 0 && impact.flyAshBricks >= 0;
    tests.push({ name: "impact counters non-negative", passed: nonNeg, details: nonNeg ? "ok" : "negative value" });

    return tests;
  }

  const devTests = runDevTests();

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container header__inner">
          <div className="brand">
            <div className="logo">W</div>
            <h1 className="brand__title">Waste-to-Resource</h1>
          </div>
          <nav className="nav">
            <a className="nav__link" href="#how">How it works</a>
            <a className="nav__link" href="#market">Marketplace</a>
            <a className="nav__link" href="#community">Community</a>
            <a className="nav__link" href="#learn">Learning Hub</a>
            <a className="nav__link" href="#gps">Fleet GPS</a>
            <button
              className="btn btn--primary btn--sm"
              onClick={() => setUser({ ...user, name: prompt("Enter your name") || "Guest" })}
            >
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="section">
        <div className="container grid grid--2">
          <div>
            <h2 className="h2">Your Waste = Community Resource</h2>
            <p className="mt-4">
              Turn kitchen scraps, plastic, and fly ash into useful products and community benefits. Track your impact, earn Green Credits, and see your neighbourhood transform.
            </p>

            <div className="actions mt-6">
              <a href="#market" className="btn btn--primary">Shop Eco-Products</a>
              <a href="#community" className="btn btn--outline">Join a Drive</a>
            </div>

            {/* Impact Counters */}
            <div className="grid grid--3 mt-6 gap-3">
              <div className="card">
                <div className="muted">Food → Biogas</div>
                <div className="kpi">{impact.foodBiogasKg.toLocaleString()} kg</div>
              </div>
              <div className="card">
                <div className="muted">Plastic → Roads</div>
                <div className="kpi">{impact.plasticRoadKg.toLocaleString()} kg</div>
              </div>
              <div className="card">
                <div className="muted">Fly Ash → Bricks</div>
                <div className="kpi">{impact.flyAshBricks.toLocaleString()} units</div>
              </div>
            </div>
          </div>

          {/* Citizen Dashboard preview / card */}
          <aside className="card">
            <h3 className="h3">Citizen Dashboard</h3>
            <div className="mt-3">
              <div className="muted">Welcome</div>
              <div className="title-lg">{user.name}</div>
              <div className="mt-2 small">
                Contributed: <span className="strong">{user.contributedKg} kg</span>
              </div>
              <div className="mt-1 small">
                Green Credits: <span className="strong">{user.credits}</span>
              </div>

              <form onSubmit={handleContribute} className="mt-4">
                <label className="small">Contribute waste (kg)</label>
                <div className="row mt-2">
                  <input
                    type="number"
                    min={1}
                    value={contribKg}
                    onChange={(e) => setContribKg(e.target.value)}
                    className="input input--sm"
                  />
                  <button type="submit" className="btn btn--primary btn--sm">Contribute</button>
                </div>
              </form>

              <div className="mt-3 small success">{statusMessage}</div>

              <div className="row mt-4">
                <button onClick={() => redeemCredits(50)} className="btn btn--ghost btn--sm">Redeem 50</button>
                <button onClick={() => redeemCredits(100)} className="btn btn--ghost btn--sm">Redeem 100</button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section">
        <div className="container">
          <h3 className="h3">How It Works</h3>
          <div className="grid grid--4 mt-4">
            <div className="card">
              <div className="strong">1. Segregate</div>
              <div className="small mt-2">Separate wet, dry & ash at home.</div>
            </div>
            <div className="card">
              <div className="strong">2. Pickup</div>
              <div className="small mt-2">Schedule a pickup or drop at community hubs.</div>
            </div>
            <div className="card">
              <div className="strong">3. Process</div>
              <div className="small mt-2">Biogas, recycling, fly ash composites.</div>
            </div>
            <div className="card">
              <div className="strong">4. Benefit</div>
              <div className="small mt-2">Energy, roads, bricks, and discounts for citizens.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section id="market" className="section">
        <div className="container">
          <h3 className="h3">Marketplace</h3>
          <div className="grid grid--3 mt-4">
            {products.map((p) => (
              <div key={p.id} className="card">
                <div className="placeholder">Image</div>
                <div className="strong mt-2">{p.title}</div>
                <div className="small mt-1 muted">{p.description}</div>
                <div className="row mt-3">
                  <div className="strong">{p.price}</div>
                  <button className="btn btn--primary btn--sm">Buy</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Leaderboard */}
      <section id="community" className="section">
        <div className="container grid grid--2 gap-6">
          <div>
            <h3 className="h3">Community Leaderboard</h3>
            <div className="card mt-4">
              {leadboard.map((l, idx) => (
                <div key={l.name} className="list-row">
                  <div className="row">
                    <div className="badge">{idx + 1}</div>
                    <div>
                      <div className="strong">{l.name}</div>
                      <div className="small muted">Points: {l.points}</div>
                    </div>
                  </div>
                  <button className="btn btn--ghost btn--sm">View</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="h3">Volunteer & Drives</h3>
            <div className="card mt-4">
              <p className="small muted">Join local clean-up drives, set up compost hubs in your apartment, or start a fly ash innovation club at school.</p>
              <div className="mt-4">
                <button className="btn btn--primary">Sign Up as Volunteer</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Hub */}
      <section id="learn" className="section">
        <div className="container">
          <h3 className="h3">Learning Hub</h3>
          <div className="grid grid--3 mt-4">
            <div className="card">
              <div className="strong">DIY Composting</div>
              <div className="small mt-2 muted">Step-by-step guide for home composting and bokashi.</div>
            </div>
            <div className="card">
              <div className="strong">Fly Ash Uses</div>
              <div className="small mt-2 muted">How fly ash becomes bricks and composites.</div>
            </div>
            <div className="card">
              <div className="strong">Plastic to Road</div>
              <div className="small mt-2 muted">Infographic showing the process and benefits.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet GPS Tracking */}
      <section id="gps" className="section">
        <div className="container">
          <h3 className="h3">Fleet GPS Tracking</h3>
          <div className="grid grid--2 mt-4">
            {/* Map */}
            <div className="card">
              <svg className="map" viewBox="0 0 400 400" role="img" aria-label="Vehicle positions">
                {vehicles.map((v) => {
                  const pos = project(v.lat, v.lng);
                  return (
                    <circle key={v.id} cx={200 + pos.x} cy={200 + pos.y} r="6" fill={v.status === "Active" ? "#16a34a" : "#f59e0b"}>
                      <title>
                        {v.name} ({v.status})
                      </title>
                    </circle>
                  );
                })}
              </svg>
              <div className="small muted mt-2">Simplified city map with vehicle markers</div>
            </div>

            {/* List */}
            <div className="card">
              {vehicles.map((v) => (
                <div key={v.id} className="list-row">
                  <div>
                    <div className="strong">{v.name}</div>
                    <div className="small muted">Lat: {v.lat}, Lng: {v.lng}</div>
                  </div>
                  <span className={`chip ${v.status === "Active" ? "chip--green" : "chip--yellow"}`}>{v.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Developer Test Panel */}
          <details className="card mt-6">
            <summary className="strong cursor">Developer Test Panel (inline smoke tests)</summary>
            <ul className="list mt-3">
              {devTests.map((t, i) => (
                <li key={i}>
                  <span className={t.passed ? "pass" : "fail"}>{t.passed ? "PASS" : "FAIL"}</span>
                  {": "}
                  <span className="strong">{t.name}</span>
                  {" – "}
                  <span className="muted">{t.details}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container small muted">© {new Date().getFullYear()} Waste-to-Resource Prototype</div>
      </footer>
    </div>
  );
}
