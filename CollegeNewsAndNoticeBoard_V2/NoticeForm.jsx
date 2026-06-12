import React, { useState } from 'react';

export default function NoticeForm({ onAddNotice, onClose }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');
  const [isAlert, setIsAlert] = useState(false);

  // Track flow pipeline progress dynamically as user types
  const [currentStep, setCurrentStep] = useState(1);

  // CO5 Form Validation Pipeline
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Notice title is required';
    }

    if (!content.trim()) {
      newErrors.content = 'Notice content is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);

    if (e.target.value && currentStep === 1) {
      setCurrentStep(2);
    } else if (!e.target.value && !content) {
      setCurrentStep(1);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);

    if (e.target.value && title) {
      setCurrentStep(3);
    } else if (!e.target.value && title) {
      setCurrentStep(2);
    }
  };

  // CO4 Async Event Handling
  const handleTriggerNotification = async () => {
    if (!validateForm()) return;

    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    setCurrentStep(4);

    alert(
      'System Message: Push notification alerts and global email dispatches have been successfully queued for all registered students!'
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formattedNotice = {
      id: Date.now(),
      title,
      category,
      content,
      author: 'Admin Office',
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      isAlert,
    };

    onAddNotice(formattedNotice);
    onClose();
  };

  return (
    <div
      className="form-panel"
      style={{ position: 'relative', paddingTop: '25px' }}
    >
      <span
        className="tag-flag tag-notify"
        style={{
          position: 'absolute',
          top: '-10px',
          right: '16px',
        }}
      >
        Notice Form
      </span>

      <div className="form-header-row">
        <h3
          className="font-serif"
          style={{
            fontSize: '18px',
            color: '#111827',
          }}
        >
          Create New Announcement Notice
        </h3>

        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            color: '#9ca3af',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
      </div>

      {/* Publish Flow Timeline */}
      <div className="flow-timeline-container">
        <span
          className="tag-flag tag-admin"
          style={{
            background: '#f3e8ff',
            color: '#6b21a8',
            fontSize: '9px',
          }}
        >
          Publish Flow
        </span>

        <p
          style={{
            fontSize: '11px',
            color: '#6b7280',
            fontWeight: '700',
            marginTop: '6px',
          }}
        >
          Publish Flow (For Admin Contexts)
        </p>

        <div className="flow-step-row">
          <div
            className={`flow-node ${
              currentStep >= 1 ? 'completed' : ''
            } ${currentStep === 1 ? 'active' : ''}`}
          >
            <div className="flow-node-circle">1</div>
            <span className="flow-node-label">
              Draft
              <br />
              <span
                style={{
                  fontWeight: 'normal',
                  fontSize: '9px',
                }}
              >
                Create Notice
              </span>
            </span>
          </div>

          <div
            className={`flow-connector-line ${
              currentStep >= 2 ? 'filled' : ''
            }`}
          ></div>

          <div
            className={`flow-node ${
              currentStep >= 2 ? 'completed' : ''
            } ${currentStep === 2 ? 'active' : ''}`}
          >
            <div className="flow-node-circle">2</div>
            <span className="flow-node-label">
              Review
              <br />
              <span
                style={{
                  fontWeight: 'normal',
                  fontSize: '9px',
                }}
              >
                Verify Content
              </span>
            </span>
          </div>

          <div
            className={`flow-connector-line ${
              currentStep >= 3 ? 'filled' : ''
            }`}
          ></div>

          <div
            className={`flow-node ${
              currentStep >= 3 ? 'completed' : ''
            } ${currentStep === 3 ? 'active' : ''}`}
          >
            <div className="flow-node-circle">3</div>
            <span className="flow-node-label">
              Publish
              <br />
              <span
                style={{
                  fontWeight: 'normal',
                  fontSize: '9px',
                }}
              >
                Make It Live
              </span>
            </span>
          </div>

          <div
            className={`flow-connector-line ${
              currentStep >= 4 ? 'filled' : ''
            }`}
          ></div>

          <div
            className={`flow-node ${
              currentStep === 4
                ? 'completed active'
                : ''
            }`}
          >
            <div className="flow-node-circle">4</div>
            <span className="flow-node-label">
              Notify
              <br />
              <span
                style={{
                  fontWeight: 'normal',
                  fontSize: '9px',
                }}
              >
                Send Dispatches
              </span>
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Notice Headline Title</label>

            <input
              aria-label="Notice Title"
              type="text"
              placeholder="e.g., Mid Semester Examination Schedule Details"
              value={title}
              onChange={handleTitleChange}
              required
            />

            {errors.title && (
              <p
                style={{
                  color: '#dc2626',
                  fontSize: '11px',
                  marginTop: '4px',
                }}
              >
                {errors.title}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Category Placement Scope</label>

            <select
              aria-label="Notice Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="General">General</option>
              <option value="Academic">Academic</option>
              <option value="Examination">Examination</option>
              <option value="Event">Event</option>
              <option value="Placement">Placement</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div className="form-checkbox-row">
          <input
            aria-label="Alert Notice"
            type="checkbox"
            id="isAlertCheckbox"
            checked={isAlert}
            onChange={(e) =>
              setIsAlert(e.target.checked)
            }
            style={{
              width: 'auto',
              cursor: 'pointer',
            }}
          />

          <label
            htmlFor="isAlertCheckbox"
            style={{
              color: '#991b1b',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              margin: 0,
            }}
          >
            🚨 Flag as Important/Emergency broadcast
            announcement (ALERT FLAG)
          </label>
        </div>

        <div className="editor-workspace">
          <div className="editor-toolbar-strip">
            <span
              className="tag-flag tag-search"
              style={{
                fontSize: '9px',
                background: '#fffbeb',
                color: '#b45309',
              }}
            >
              Rich Text Editor
            </span>
          </div>

          <textarea
            aria-label="Notice Content"
            className="editor-input-area"
            placeholder="Type comprehensive bulletin board notice details here..."
            value={content}
            onChange={handleContentChange}
            required
          />

          {errors.content && (
            <p
              style={{
                color: '#dc2626',
                fontSize: '11px',
                padding: '8px 12px',
              }}
            >
              {errors.content}
            </p>
          )}
        </div>

        <div className="form-action-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn-indigo"
            onClick={handleTriggerNotification}
          >
            📢 Broadcast Student Notifications
          </button>

          <button
            type="submit"
            className="submit-btn"
          >
            💾 Complete & Publish Live
          </button>
        </div>
      </form>
    </div>
  );
}