import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StartTask = ({ tasks, updateTaskStatus }) => {
  const [activeTask, setActiveTask] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate(); // For navigation after completion

  // Function to start the task timer
  const startTask = (task) => {
    setActiveTask(task);
    setTimeLeft(task.duration * 60); // Convert minutes to seconds
    setIsRunning(true);
  };

  // Function to pause or resume the timer
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  // Timer countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && activeTask) {
      handleTaskCompletion();
    }
  }, [isRunning, timeLeft, activeTask]);

  // Function to handle task completion
  const handleTaskCompletion = () => {
    setIsRunning(false);
    const isCompleted = window.confirm(
      `Did you complete the task: "${activeTask.name}"? Click OK for Completed, Cancel for Incomplete.`
    );

    // Update task status in Task List & Calendar
    updateTaskStatus(activeTask.name, isCompleted ? "completed" : "incomplete");

    // Reset after completion
    setActiveTask(null);
    setTimeLeft(0);

    // Redirect to task list after finishing
    navigate("/tasklist");
  };

  return (
    <div className="start-task-container">
      <h2>Start Task</h2>
      <ul>
        {tasks.length === 0 ? (
          <p>No tasks available. Please add tasks in the Task List.</p>
        ) : (
          tasks.map((task) => (
            <li key={task.name}>
              {task.name} - {task.duration} min
              <button onClick={() => startTask(task)}>Start</button>
            </li>
          ))
        )}
      </ul>

      {activeTask && (
        <div className="task-timer">
          <h3>Working on: {activeTask.name}</h3>
          <p>
            Time Left: {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? "0" : ""}
            {timeLeft % 60}
          </p>
          <button onClick={toggleTimer}>{isRunning ? "Pause" : "Resume"}</button>
        </div>
      )}
    </div>
  );
};

export default StartTask;
