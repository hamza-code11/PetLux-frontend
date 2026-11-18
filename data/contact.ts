import { ContactMessage } from "@/types/contact";

export const CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 1,
    name: "Ahmed Raza",
    email: "ahmed.raza@example.com",
    subject: "Order Inquiry",
    message: "Assalam o Alaikum, mujhe apne order ka status check karna hai. Order #12345 abhi tak deliver nahi hua.",
    status: "unread",
    date: "2026-11-18",
  },
  {
    id: 2,
    name: "Fatima Noor",
    email: "fatima.noor@example.com",
    subject: "Product Availability",
    message: "Hello, kya aapke paas Premium Cat Food ka 5kg pack available hai? Main order karna chahti hoon.",
    status: "read",
    date: "2026-11-17",
  },
  {
    id: 3,
    name: "Zainab Ali",
    email: "zainab.ali@example.com",
    subject: "Return Policy",
    message: "Mujhe return policy ke baray mein maloomat chahiye. Kya 7 din ke andar return possible hai?",
    status: "read",
    date: "2026-11-16",
  },
  {
    id: 4,
    name: "Usman Sheikh",
    email: "usman.sheikh@example.com",
    subject: "Bulk Order Discount",
    message: "Main apni pet shop ke liye bulk order karna chahta hoon. Kya aap bulk discount dete hain?",
    status: "unread",
    date: "2026-11-15",
  },
  {
    id: 5,
    name: "Hira Khan",
    email: "hira.khan@example.com",
    subject: "Feedback",
    message: "Aapki service bohat achi hai, lekin delivery thodi late thi. Overall experience acha raha.",
    status: "read",
    date: "2026-11-14",
  },
];

