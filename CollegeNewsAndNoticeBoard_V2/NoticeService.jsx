export const fetchInitialNotices = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Mid Semester Examination Schedule",
          category: "Academic",
          author: "Admin",
          date: "20 May 2026",
          content:
            "The Mid Semester Examinations for all departments will commence from 3rd June 2026.",
          isAlert: false,
        },
        {
          id: 2,
          title: "Important: College Timing Change",
          category: "General",
          author: "Admin",
          date: "18 May 2026",
          content:
            "Please note that the college timings will remain 9:00 AM to 3:00 PM from 20th May onwards.",
          isAlert: true,
        },
        {
          id: 3,
          title: "Techfest 2026 - Registration Open",
          category: "Event",
          author: "Admin",
          date: "18 May 2026",
          content:
            "Registration for Techfest 2026 is now open. Register before the deadline.",
          isAlert: false,
        },
        {
          id: 4,
          title: "Placement Drive by Infotech Ltd.",
          category: "Placement",
          author: "Admin",
          date: "17 May 2026",
          content:
            "Infotech Ltd. is conducting a placement drive for the 2026 batch on 25th May.",
          isAlert: false,
        },
        {
          id: 5,
          title: "Annual Sports Day - 2026",
          category: "Event",
          author: "Admin",
          date: "16 May 2026",
          content:
            "Join us for the Annual Sports Day on 30th May 2026. All are welcome!",
          isAlert: false,
        },
      ]);
    }, 300);
  });
};