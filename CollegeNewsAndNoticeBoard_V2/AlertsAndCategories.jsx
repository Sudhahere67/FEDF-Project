import React, { memo } from "react";

function AlertsAndCategories({
  notices,
}) {
  const alerts = notices.filter(
    (n) => n.isAlert
  );

  return (
    <div className="sidebar-widget sidebar-widget-alert">

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
        }}
      >
        <h3>Important Alerts</h3>

        <span className="tag-flag tag-alert">
          Alert Flag
        </span>
      </div>

      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="alert-item"
        >
          <strong>
            {alert.title}
          </strong>

          <p
            style={{
              fontSize: "12px",
              marginTop: "4px",
            }}
          >
            {alert.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default memo(
  AlertsAndCategories
);