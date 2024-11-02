"use client";

import React from "react";
import "./dashboardSidebar.css";

export default function DashboardSidebar() {
  return (
    <div id="sidebar" className="secondary">
      <div
        className="header"
        style={{ display: "inline-grid", justifyContent: "center" }}
      >
        <h1 className="navheader">Dashboard</h1>
      </div>
      <div className="content">
        <ul>
          <li className={window.location.pathname === "/" ? "active" : ""}>
            <a href="/">
              <i className="home icon"></i> Überblick
            </a>
          </li>
          <li className={window.location.pathname === "/customers" ? "active" : ""}>
            <a href="/customers">
              <i className="address card icon"></i> Kunden
            </a>
          </li>
          <li className={window.location.pathname === "/offers" ? "active" : ""}>
            <a href="/offers">
              <i className="envelope icon"></i> Angebote
            </a>
          </li>
        </ul>
      </div>
      <div className="footer">
        <ul>
          <li className={window.location.pathname === "/settings" ? "active" : ""}>
            <a href="/settings">
              <i className="cog icon"></i> Einstellungen
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
