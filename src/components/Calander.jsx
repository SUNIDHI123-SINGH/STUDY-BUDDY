import React, { useState } from "react";
import "../assets/css/calendar.css"; // Ensure correct CSS path

const Calander = ({ tasks = [] }) => { // Ensure tasks is always an array
  const [selectedDate, setSelectedDate] = useState(null); // Stores selected date for viewing tasks

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Generate days of the current month
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  // Function to format date from yyyy-mm-dd to dd-mm-yyyy
  const formatDate = (dateObj) => {
    if (!dateObj) return ""; // Handle undefined/null cases
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Organize tasks by date
  const tasksByDate = tasks.reduce((acc, task) => {
    if (!task.startDate) return acc; // Ensure task has a valid date
    const formattedDate = formatDate(new Date(task.startDate)); // Convert startDate
    if (!acc[formattedDate]) acc[formattedDate] = [];
    acc[formattedDate].push(task);
    return acc;
  }, {});

  // Get task status color
  const getTaskStatusColor = (task) => {
    if (task.completed) return "green"; // Completed 🟢
    if (task.halfDone) return "red"; // Half-done 🔴
    return "yellow"; // Pending 🟡
  };

  return (
    <div className="calendar-container">
      <h2>Calendar - {today.toLocaleString("default", { month: "long" })} {currentYear}</h2>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {[...Array(daysInMonth)].map((_, day) => {
          const dateObj = new Date(currentYear, currentMonth, day + 1);
          const date = formatDate(dateObj);
          const taskList = tasksByDate[date] || [];
          const taskColor = taskList.length ? getTaskStatusColor(taskList[0]) : "transparent";

          return (
            <div
              key={date}
              className="calendar-day"
              style={{ backgroundColor: taskColor }}
              onClick={() => setSelectedDate(date)}
            >
              {day + 1}
            </div>
          );
        })}
      </div>

      {/* Task Details on Date Selection */}
      {selectedDate && (
        <div className="task-details">
          <h3>Tasks for {selectedDate}</h3>
          {tasksByDate[selectedDate] && tasksByDate[selectedDate].length > 0 ? (
            <ul>
              {tasksByDate[selectedDate].map((task, index) => (
                <li key={index} style={{ color: getTaskStatusColor(task) }}>
                  {task.name} ({task.startTime} - {task.endTime})
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calander;
