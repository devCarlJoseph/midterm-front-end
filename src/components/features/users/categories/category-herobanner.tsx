import React from "react";
import Breadcrumb from "./category-breadcrumb";

const HeroBanner: React.FC = () => {
  return (
    <section className="hero-section">

      <Breadcrumb />

      <div className="hero-banner">

        <div className="hero-text">

          <h1>
            Shop by
            <span>Category</span>
          </h1>

          <p>
            Find everything you need, from fresh produce
            to daily essentials.
            <br />
            Browse our categories and discover great
            deals near you.
          </p>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85"
            alt="Fresh groceries"
          />

          <div className="hero-message">

            <span>Fresh choices</span>
            <span>for a healthier</span>
            <span>you</span>

            <div className="hero-line" />

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroBanner;