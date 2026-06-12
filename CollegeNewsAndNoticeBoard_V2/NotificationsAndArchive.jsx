// src/components/NotificationsAndArchive.jsx

import React from "react";

export default function NotificationsAndArchive({
  setSearchQuery,
  setArchiveFilter,
}) {
  const customLogs = [
    {
      id: 1,
      text: "New notice published: Mid Semester Schedule",
      time: "10 min ago",
      keyword: "Mid Semester",
    },
    {
      id: 2,
      text: "Techfest registration window open",
      time: "1 hour ago",
      keyword: "Techfest",
    },
    {
      id: 3,
      text: "Exam schedule updated in board",
      time: "2 hours ago",
      keyword: "Examination",
    },
  ];

  const archiveMonths = [
    {
      name: "May 2026",
      queryValue: "May 2026",
      icon: "📅",
    },
    {
      name: "April 2026",
      queryValue: "Apr 2026",
      icon: "📅",
    },
    {
      name: "March 2026",
      queryValue: "Mar 2026",
      icon: "📅",
    },
    {
      name: "January 2026",
      queryValue: "Jan 2026",
      icon: "📅",
    },
  ];

  const handleNotificationClick = (keyword) => {
    setArchiveFilter("");
    setSearchQuery(keyword);
  };

  const handleArchiveClick = (month) => {
    setSearchQuery("");
    setArchiveFilter(month);
  };

  const handleViewAll = () => {
    setSearchQuery("");
    setArchiveFilter("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
      }}
    >
      {/* Notifications Module */}
      <div
        className="sidebar-widget"
        style={{
          position: "relative",
          paddingTop: "20px",
        }}
      >
        <span
          className="tag-flag tag-notify"
          style={{
            position: "absolute",
            top: "-10px",
            right: "12px",
          }}
        >
          Notifications
        </span>

        <div className="widget-header-row">
          <h4 className="widget-title">
            Live Updates
          </h4>

          <button
            className="widget-action-link"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleViewAll}
          >
            View All
          </button>
        </div>

        <div>
          {customLogs.map((log) => (
            <div
              key={log.id}
              className="notification-item"
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                handleNotificationClick(
                  log.keyword
                )
              }
            >
              <div className="notification-icon-badge">
                🔔
              </div>

              <div className="notification-text-content">
                <p className="notification-message">
                  {log.text}
                </p>

                <span className="notification-timestamp">
                  {log.time}
                  <span
                    style={{
                      color: "#2563eb",
                    }}
                  >
                    {" "}
                    • Filter →
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Archive Module */}
      <div
        className="sidebar-widget"
        style={{
          position: "relative",
          paddingTop: "20px",
        }}
      >
        <span
          className="tag-flag tag-admin"
          style={{
            position: "absolute",
            top: "-10px",
            right: "12px",
            background: "#e0f2fe",
            color: "#0369a1",
          }}
        >
          Archive
        </span>

        <div className="widget-header-row">
          <h4 className="widget-title">
            Notice History
          </h4>

          <button
            className="widget-action-link"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() =>
              handleArchiveClick("2026")
            }
          >
            View History (2026) →
          </button>
        </div>

        <div className="archive-grid-list">
          {archiveMonths.map(
            (item, index) => (
              <div
                key={index}
                className="archive-row-item"
                onClick={() =>
                  handleArchiveClick(
                    item.queryValue
                  )
                }
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}