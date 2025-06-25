import React, { useState } from "react";

const RegradePage: React.FC = () => {
  const [studentRollNo, setStudentRollNo] = useState("");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [course] = useState("PMG201c");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="w-[90vw] max-w-[1200px] mx-auto bg-white border border-gray-200 rounded-3xl shadow-2xl p-10 mb-50">
        <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center">
          Request Regrade
        </h2>
        {submitted ? (
          <div className="text-green-600 font-semibold text-center text-lg">
            Your regrade request has been submitted!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {[
              {
                label: "Student Roll No:",
                value: studentRollNo,
                setValue: setStudentRollNo,
                type: "text",
              },
              {
                label: "Student name:",
                value: studentName,
                setValue: setStudentName,
                type: "text",
              },
              {
                label: "Email:",
                value: email,
                setValue: setEmail,
                type: "email",
              },
            ].map((item, idx) => (
              <div className="grid grid-cols-12 items-center gap-4" key={idx}>
                <label className="col-span-3 font-semibold text-lg text-gray-700 text-right pr-4">
                  {item.label}
                </label>
                <input
                  className="col-span-9 border border-blue-200 rounded-lg w-full p-3 bg-gray-50 focus:bg-white focus:border-blue-500 focus:shadow-md outline-none text-lg transition"
                  type={item.type}
                  value={item.value}
                  onChange={(e) => item.setValue(e.target.value)}
                  required
                />
              </div>
            ))}
            <div className="grid grid-cols-12 items-center gap-4">
              <label className="col-span-3 font-semibold text-lg text-gray-700 text-right pr-4">
                Course:
              </label>
              <input
                className="col-span-9 border border-blue-200 rounded-lg w-full p-3 bg-gray-100 text-lg"
                type="text"
                value={course}
                disabled
                readOnly
              />
            </div>
            <div className="grid grid-cols-12 items-start gap-4">
              <label className="col-span-3 font-semibold text-lg text-gray-700 text-right pr-4 pt-2">
                Reason:
              </label>
              <textarea
                className="col-span-9 border border-blue-200 rounded-lg w-full p-3 bg-gray-50 focus:bg-white focus:border-blue-500 focus:shadow-md outline-none text-lg transition resize-none"
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-10 py-3 rounded-xl shadow hover:bg-blue-700 transition text-lg"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegradePage;
