import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
} from "react";
import ProtectedRoute from "./ProtectedRoute";

import { Routes, Route, Navigate } from "react-router-dom";

import { NoticeContext } from "./NoticeContext";

import { fetchInitialNotices } from "./noticeService";

import { createNoticeCounter } from "./noticeCounter";
import useNoticeFilter from "./useNoticeFilter";
import { useNavigate } from "react-router-dom";
const Dashboard = lazy(() =>
  import("./Dashboard")
);

const NoticeForm = lazy(() =>
  import("./NoticeForm")
);

const SearchBar = lazy(() =>
  import("./SearchBar")
);

const AlertsAndCategories = lazy(() =>
  import("./AlertsAndCategories")
);

const NotificationsAndArchive = lazy(() =>
  import("./NotificationsAndArchive")
);

const AdminPanel = lazy(() =>
  import("./AdminPanel")
);

const AdminLogin = lazy(() =>
  import("./AdminLogin")
);

const noticeCounter = createNoticeCounter();

export default function App() {
  const navigate = useNavigate()
  const [notices, setNotices] = useState([]);

  const [categories, setCategories] = useState([
    "All",
    "General",
    "Academic",
    "Examination",
    "Event",
    "Placement",
    "Others",
  ]);

  const [isAdmin, setIsAdmin] = useState(false);

  const [viewForm, setViewForm] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [archiveFilter, setArchiveFilter] =
    useState("");
    useEffect(() => {
  console.log(
    "Application:",
    import.meta.env.VITE_APP_NAME
  );

  console.log(
    "Version:",
    import.meta.env.VITE_APP_VERSION
  );

  console.log(
    "College:",
    import.meta.env.VITE_COLLEGE_NAME
  );
}, []);
  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data =
          await fetchInitialNotices();

        setNotices(data);
      } catch (error) {
        console.error(
          "Failed loading notices",
          error
        );
      }
    };

    loadNotices();
  }, []);

  const handleAddNotice = (newNotice) => {
    console.log(
      "Notice Created Count:",
      noticeCounter()
    );

    setNotices((prev) => [
      newNotice,
      ...prev,
    ]);

    if (
      newNotice.category &&
      !categories.includes(
        newNotice.category
      )
    ) {
      setCategories((prev) => [
        ...prev,
        newNotice.category,
      ]);
    }
  };
   const handleLogout = () => {
    setIsAdmin(false);
    setViewForm(false);

    setSelectedCategory("All");
    setSearchQuery("");
    setArchiveFilter("");

    navigate("/");
  };

  const filteredNotices =
  useNoticeFilter(
    notices,
    selectedCategory,
    searchQuery,
    archiveFilter
  );

  const contextValue = {
    notices,
    setNotices,
    categories,
    setCategories,
    isAdmin,
    setIsAdmin,
  };

  return (
    <NoticeContext.Provider
      value={contextValue}
    >
      <Suspense
        fallback={
          <div
            style={{
              padding: "20px",
              textAlign: "center",
            }}
          >
            Loading...
          </div>
        }
      >
        <Routes>

          <Route
            path="/"
            element={
              <div>
                <header className="college-header">
  <div className="header-title">
    {import.meta.env.VITE_COLLEGE_NAME}
    <span
      style={{
        fontSize: "14px",
        fontWeight: "normal",
      }}
    >
      {" "}
      News & Notice Board Portal
    </span>
  </div>

  {isAdmin ? (
  <button
    className="admin-btn"
    onClick={handleLogout}
  >
    Logout 
  </button>
) : (
  <button
    className="admin-btn"
    onClick={() => navigate("/admin")}
  >
    Admin Login
  </button>
)}
</header>

                <main className="main-container">

                  <div className="left-column">

                    <SearchBar
                      searchQuery={
                        searchQuery
                      }
                      setSearchQuery={
                        setSearchQuery
                      }
                    />

                    {viewForm &&
                    isAdmin ? (
                      <NoticeForm
                        onAddNotice={
                          handleAddNotice
                        }
                        onClose={() =>
                          setViewForm(
                            false
                          )
                        }
                      />
                    ) : (
                      <Dashboard
                        categories={
                          categories
                        }
                        selectedCategory={
                          selectedCategory
                        }
                        setSelectedCategory={
                          setSelectedCategory
                        }
                        searchFilteredNotices={
                          filteredNotices
                        }
                      />
                    )}
                  </div>

                  <div className="right-column">

                    <AlertsAndCategories
                      notices={notices}
                    />

                    {isAdmin && (
                      <AdminPanel
                        setViewForm={
                          setViewForm
                        }
                        onManageNotices={() =>
                          alert(
                            "Viewing Notices"
                          )
                        }
                        onManageCategories={() =>
                          alert(
                            "Category Management"
                          )
                        }
                        onManageUsers={() =>
                          alert(
                            "Manage Users"
                          )
                        }
                        onSystemSettings={() =>
                          alert(
                            "System Settings"
                          )
                        }
                      />
                    )}

                    <NotificationsAndArchive
                      setSearchQuery={
                        setSearchQuery
                      }
                      setArchiveFilter={
                        setArchiveFilter
                      }
                    />
                  </div>

                </main>

                <footer className="college-footer">
                  <p>
                    © 2026 KLH University
                  </p>
                </footer>
              </div>
            }
          />
          <Route
  path="/admin"
  element={
    <AdminLogin
      onLogin={() => {
        setIsAdmin(true);
      }}
    />
  }
/>

          <Route
            path="*"
            element={
              <Navigate to="/" />
            }
          />

        </Routes>
      </Suspense>
    </NoticeContext.Provider>
  );
}