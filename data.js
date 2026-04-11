const courses = [
  {
    id: "cs301",
    name: "Operating Systems",
    teacher: "Prof. Sharma",
    color: "#7F77DD",
    announcements: [
      { id: 1, text: "Mid-sem syllabus revised. Unit 4 is excluded.", date: "Apr 3, 2026" },
      { id: 2, text: "Lab session on Thursday shifted to Friday 2pm.", date: "Apr 1, 2026" }
    ],
    assignments: [
      { id: 1, title: "Process Scheduling Report", due: "Apr 10, 2026", status: "pending" },
      { id: 2, title: "Semaphore Implementation", due: "Mar 28, 2026", status: "submitted", submittedOn: "Mar 27, 2026" },
      { id: 3, title: "Deadlock Analysis", due: "Mar 15, 2026", status: "graded", grade: "18/20", submittedOn: "Mar 14, 2026" }
    ]
  },
  {
    id: "cs302",
    name: "Discrete Mathematics",
    teacher: "Prof. Verma",
    color: "#1D9E75",
    announcements: [
      { id: 1, text: "Unit test 2 covers Relations and Graph Theory only.", date: "Apr 5, 2026" }
    ],
    assignments: [
      { id: 1, title: "Hasse Diagram Problems", due: "Apr 12, 2026", status: "pending" },
      { id: 2, title: "Recurrence Relations Assignment", due: "Apr 2, 2026", status: "submitted", submittedOn: "Apr 2, 2026" }
    ]
  },
  {
    id: "cs303",
    name: "Java Programming",
    teacher: "Prof. Iyer",
    color: "#D85A30",
    announcements: [
      { id: 1, text: "Practical exam on April 18. Bring your college ID.", date: "Apr 4, 2026" }
    ],
    assignments: [
      { id: 1, title: "Exception Handling Program", due: "Apr 8, 2026", status: "pending" },
      { id: 2, title: "Inheritance Mini Project", due: "Mar 20, 2026", status: "graded", grade: "24/25", submittedOn: "Mar 19, 2026" }
    ]
  },
  {
    id: "cs304",
    name: "Computer Networks",
    teacher: "Prof. Khan",
    color: "#185FA5",
    announcements: [],
    assignments: [
      { id: 1, title: "OSI vs TCP/IP Comparison", due: "Apr 15, 2026", status: "pending" },
      { id: 2, title: "Socket Programming Lab", due: "Apr 6, 2026", status: "submitted", submittedOn: "Apr 5, 2026" }
    ]
  }
];