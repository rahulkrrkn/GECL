// "use client";
// import Link from "next/link";
// import React from "react";
// import {
//   AlertMessage,
//   Button,
//   Input,
//   Select,
//   Textarea,
// } from "@/gecl/components/ui";
// const departmentOptions = [
//   { value: "cse", label: "Computer Science & Engineering (CSE)" },
//   { value: "ece", label: "Electronics & Communication (ECE)" },
//   { value: "ee", label: "Electrical Engineering (EE)" },
//   { value: "me", label: "Mechanical Engineering (ME)" },
//   { value: "ce", label: "Civil Engineering (CE)" },
// ];

// const yearOptions = [
//   { value: "1", label: "1st Year" },
//   { value: "2", label: "2nd Year" },
//   { value: "3", label: "3rd Year" },
//   { value: "4", label: "4th Year" },
// ];

// const genderOptions = [
//   { value: "male", label: "Male" },
//   { value: "female", label: "Female" },
//   { value: "other", label: "Other" },
// ];

// export default function HowToUseCustomUI() {
//   const [department, setDepartment] = React.useState("");
//   const [year, setYear] = React.useState("");
//   const [gender, setGender] = React.useState("");
//   const [bio, setBio] = React.useState("");
//   return (
//     <>
//       <div className="mx-auto max-w-xl space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
//         <AlertMessage
//           type="success"
//           title="Saved!"
//           msg="Your profile was updated."
//         />

//         <AlertMessage
//           type="error"
//           title="Failed"
//           msg="Something went wrong. Try again."
//           actionLabel="Retry"
//           onAction={() => console.log("retry")}
//         />

//         <AlertMessage
//           type="warning"
//           msg="Password is weak."
//           autoCloseMs={3000}
//         />
//       </div>
//       <div className="mx-auto max-w-xl space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
//         <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
//           Buttons (Demo)
//         </h2>
//         <Button variant="primary">Primary</Button>
//         <Button variant="secondary">Secondary</Button>
//         <Button variant="accent">Accent</Button>
//         <Button variant="danger">Danger</Button>
//         <Button variant="ghost">Ghost</Button>

//         <Button loading>Saving...</Button>
//         <Button disabled>Disabled</Button>
//       </div>
//       <Input
//         label="Email"
//         placeholder="rahul@example.com"
//         status="error"
//         message="Email is required"
//         required
//       />
//       <div className="mx-auto max-w-lg space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
//         <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
//           Student Form (Demo)
//         </h2>

//         <Select
//           label="Department"
//           value={department}
//           onChange={(e) => setDepartment(e.target.value)}
//           options={departmentOptions}
//           placeholder="Select department"
//           required
//           status={!department ? "error" : "success"}
//           message={
//             !department ? "Please select your department" : "Looks good!"
//           }
//         />

//         <Select
//           label="Year"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           options={yearOptions}
//           placeholder="Select year"
//           required
//           status={!year ? "warning" : "success"}
//           message={!year ? "Year is required" : "Perfect"}
//         />

//         <Select
//           label="Gender"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//           options={genderOptions}
//           placeholder="Select gender"
//           status={gender ? "info" : undefined}
//           message={gender ? `Selected: ${gender}` : ""}
//         />

//         <button
//           type="button"
//           className="w-full rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
//           onClick={() => {
//             console.log({ department, year, gender });
//             alert(
//               `Submitted:\nDepartment: ${department}\nYear: ${year}\nGender: ${gender}`,
//             );
//           }}
//         >
//           Submit
//         </button>
//       </div>
//       <div className="mx-auto max-w-lg space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
//         <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
//           Feedback Form (Demo)
//         </h2>

//         <Textarea
//           label="Your Message"
//           placeholder="Write your feedback..."
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           status={!bio ? "warning" : bio.length < 10 ? "error" : "success"}
//           message={
//             !bio
//               ? "Message is required"
//               : bio.length < 10
//                 ? "Write at least 10 characters"
//                 : "Perfect!"
//           }
//           autoResize
//           showCount
//           maxLength={200}
//         />
//       </div>
//     </>
//   );
// }
