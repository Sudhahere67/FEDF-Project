import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
} from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { NoticeContext } from "./components/NoticeContext";

import { fetchInitialNotices } from "./components/noticeService";

import { createNoticeCounter } from "./components/noticeCounter";

const Dashboard = lazy(() =>
  import("./components/Dashboard")
);

const NoticeForm = lazy(() =>
  import("./components/NoticeForm")
);

const SearchBar = lazy(() =>
  import("./components/SearchBar")
);

const AlertsAndCategories = lazy(() =>
  import("./components/AlertsAndCategories")
);

const NotificationsAndArchive = lazy(() =>
  import("./components/NotificationsAndArchive")
);

const AdminPanel = lazy(() =>
  import("./components/AdminPanel")
);

const AdminLogin = lazy(() =>
  import("./components/AdminLogin")
);

const noticeCounter = createNoticeCounter();

export default function App() {
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

  const filteredNotices = notices.filter(
    (notice) => {
      const matchesCategory =
        selectedCategory === "All" ||
        notice.category.toLowerCase() ===
          selectedCategory.toLowerCase();

      const matchesSearch =
        notice.title
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          ) ||
        notice.content
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          ) ||
        notice.category
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );

      const matchesArchive =
        !archiveFilter ||
        notice.date
          .toLowerCase()
          .includes(
            archiveFilter.toLowerCase()
          );

      return (
        matchesCategory &&
        matchesSearch &&
        matchesArchive
      );
    }
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
                    KLH University
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "normal",
                      }}
                    >
                      {" "}
                      News & Notice Board
                      Portal
                    </span>
                  </div>
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
                onLogin={() =>
                  setIsAdmin(true)
                }
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