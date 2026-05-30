import { useMemo } from "react";

export default function useNoticeFilter(
  notices,
  selectedCategory,
  searchQuery,
  archiveFilter
) {
  return useMemo(() => {
    return notices.filter((notice) => {
      const matchesCategory =
        selectedCategory === "All" ||
        notice.category.toLowerCase() ===
          selectedCategory.toLowerCase();

      const matchesSearch =
        notice.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        notice.content
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        notice.category
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

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
    });
  }, [
    notices,
    selectedCategory,
    searchQuery,
    archiveFilter,
  ]);
}