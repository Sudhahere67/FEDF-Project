import {
  render,
  screen,
} from "@testing-library/react";

import Dashboard from "./Dashboard";

describe(
  "Dashboard Component",
  () => {
    test(
      "renders dashboard title",
      () => {
        render(
          <Dashboard
            categories={[]}
            selectedCategory=""
            setSelectedCategory={() => {}}
            searchFilteredNotices={
              []
            }
          />
        );

        expect(
          screen.getByText(
            /Notice Board Feed/i
          )
        ).toBeInTheDocument();
      }
    );
  }
);