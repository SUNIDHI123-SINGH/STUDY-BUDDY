import React from "react";

const Timetable = ({ tasks }) => {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0]; // Get YYYY-MM-DD format
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" }); // Get Day Name

  // Filter only today's tasks and sort by start time
  const todaysTasks = tasks
    .filter((task) => task.startDate === todayDate) // Match tasks for today's date
    .sort((a, b) => a.startTime.localeCompare(b.startTime)); // Sort tasks by Start Time

  return (
    <div className="timetable-container">
      <h2>Daily Timetable</h2>
      <p><strong>{dayName}, {todayDate}</strong></p> {/* Show Current Day & Date */}

      <table className="timetable">
        <thead>
          <tr>
            <th>Start Time</th>
            <th>Task Name</th>
            <th>Subject</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {todaysTasks.length === 0 ? (
            <tr>
              <td colSpan="4">No tasks scheduled for today.</td>
            </tr>
          ) : (
            todaysTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.startTime}</td>
                <td>{task.name}</td>
                <td>{task.subject || "N/A"}</td>
                <td>{task.duration ? `${task.duration} hrs` : "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
