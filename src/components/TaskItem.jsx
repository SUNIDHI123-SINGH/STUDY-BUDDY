import React, { useState } from "react";

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [taskDetails, setTaskDetails] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleTopicChange = (e) => {
    setTaskDetails({ ...taskDetails, topics: e.target.value.split(",") });
  };

  const toggleCompletion = () => {
    setTaskDetails({ ...taskDetails, completed: !taskDetails.completed });
  };

  return (
    <li className="task-item">
      <div className="task-header">
        <span
          className={taskDetails.completed ? "completed" : ""}
          onClick={() => setShowDetails(!showDetails)}
        >
          {taskDetails.name}
        </span>
        <input type="checkbox" checked={taskDetails.completed} onChange={toggleCompletion} />
        <button onClick={() => onDelete(taskDetails.id)}>Delete</button>
      </div>

      {showDetails && (
        <div className="task-details">
          <input
            type="text"
            name="subject"
            placeholder="Task Subject"
            value={taskDetails.subject}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Task Topics (comma separated)"
            value={taskDetails.topics.join(",")}
            onChange={handleTopicChange}
          />
          <input type="date" name="startDate" value={taskDetails.startDate} onChange={handleChange} />
          <input type="date" name="endDate" value={taskDetails.endDate} onChange={handleChange} />
          <input type="text" name="timeDuration" placeholder="Time Duration (e.g. 2 hours)" value={taskDetails.timeDuration} onChange={handleChange} />
          <input type="time" name="startTime" value={taskDetails.startTime} onChange={handleChange} />
          <input type="time" name="endTime" value={taskDetails.endTime} onChange={handleChange} />
          <button onClick={() => onUpdate(taskDetails)}>Save</button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
