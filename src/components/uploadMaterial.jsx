import React, { useState } from "react";

const UploadMaterials = ({ tasks = [] }) => {  // Ensure tasks is always an array
  const [selectedTask, setSelectedTask] = useState(null);
  const [uploads, setUploads] = useState({});

  // Function to handle file selection
  const handleFileUpload = (topic, files) => {
    setUploads((prevUploads) => ({
      ...prevUploads,
      [topic]: [...(prevUploads[topic] || []), ...files],
    }));
  };

  // Drag and Drop Handlers
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, topic) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(topic, files);
  };

  return (
    <div className="upload-container">
      <h2>Upload Study Materials</h2>
      <div className="task-list">
        {tasks?.length > 0 ? (  // Check if tasks exist
          tasks.map((task) => (
            <button key={task.name} onClick={() => setSelectedTask(task)}>
              {task.name}
            </button>
          ))
        ) : (
          <p>No tasks available</p>  // Show message if no tasks
        )}
      </div>

      {selectedTask && (
        <div className="upload-section">
          <h3>Upload for: {selectedTask.name}</h3>
          {selectedTask.topics?.length > 0 ? (  // Check if topics exist
            selectedTask.topics.map((topic) => (
              <div key={topic} className="topic-upload">
                <h4>{topic}</h4>
                <div
                  className="drop-zone"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, topic)}
                >
                  Drag & Drop files here or <input type="file" multiple onChange={(e) => handleFileUpload(topic, e.target.files)} />
                </div>
                <ul>
                  {(uploads[topic] || []).map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No topics available</p>  // Show message if no topics
          )}
        </div>
      )}
    </div>
  );
};

export default UploadMaterials;
