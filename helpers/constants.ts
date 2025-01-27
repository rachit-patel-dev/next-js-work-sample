export const constants = {
  LOGIN_TOKEN: "Login Token",
};

export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const logoURL =
  "https://miraclecareusa.com/wp-content/uploads/2022/04/integrity-Love-Compassion-5.png";

export const phoneRegex = /^\+?[0-9()-]{10,}$/;
export const aideNotesTopics = [
  {
    title: "Nutrition Hydration",
    taskTitleMain: "prepare meal",
    taskTitleSub: "per prescribed diet",
    taskTitleFrequency: "each visit",
    specialNotes: {
      note: null,
    },
    class: "nutrition-hydration--1",
  },
  {
    taskTitleMain: "Encourage Fluids Intake",
    taskTitleFrequency: "each visit",
    specialNotes: {
      note: null,
    },
    class: "nutrition-hydration--2",
  },
  {
    title: "house keeping",
    taskTitleMain: "Light laundry",
    taskTitleFrequency: "weekly",
    specialNotes: {
      note: "Wednesday",
    },
    class: "house-keeping--1",
  },
  {
    taskTitleMain: "make bed",
    taskTitleFrequency: "each visit",
    specialNotes: {
      note: null,
    },
    class: "house-keeping--2",
  },
  {
    title: "Custom tasks",
    taskTitleMain: "support shopping independently",
    taskTitleFrequency: "each visit",
    specialNotes: {
      note: null,
    },
    class: "custom-tasks--1",
  },
];

export const periodOptions = ["Today", "Yesterday", "Today", "Yesterday"];

export const caregiverTableColumns = [
  { label: "visit time", value: "visit_time" },
  { label: "status", value: "status" },
  { label: "start time", value: "start_time" },
  { label: "end time", value: "end_time" },
  { label: "link to schedular", value: "link_to_schedular" },
  { label: "pat. singed", value: "pat_singed" },
  { label: "cg. singed", value: "cg_singed" },
  { label: "Billing Code", value: "billing_code" },
];

export const caregiverTableRows = [
  {
    client_name: "demo client 1",
    visit_time: null,
    status: "Started",
    start_time: null,
    end_time: null,
    link_to_schedular: "Yes",
    pat_singed: "Yes",
    cg_singed: "Yes",
    billing_code: "55631651684",
  },
  {
    client_name: "demo client 2",

    visit_time: null,
    status: "Not started",
    start_time: null,
    end_time: null,
    link_to_schedular: "Yes",
    pat_singed: "No",
    cg_singed: "No",
    billing_code: "55631651684",
  },
  {
    client_name: "demo client 3",
    visit_time: null,
    status: "Not started",
    start_time: null,
    end_time: null,
    link_to_schedular: "Yes",
    pat_singed: "No",
    cg_singed: "Yes",
    billing_code: "55631651684",
  },
  {
    client_name: "demo client 4",
    visit_time: null,
    status: "Started",
    start_time: null,
    end_time: null,
    link_to_schedular: "Yes",
    pat_singed: "Yes",
    cg_singed: "Yes",
    billing_code: "55631651684",
  },
];
