import React, { useState, useEffect } from "react";
import "../App.css";
import ProjectCard from "../components/ProjectCard";

import defaultProjects from "../data/projects";

const Projects = () => {
  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem("projects");
    return stored ? JSON.parse(stored) : defaultProjects;
  });

  const [formVisible, setFormVisible] = useState(false);
  const [mode, setMode] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    link: "",
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const openAddForm = () => {
    setFormData({ title: "", description: "", tech: "", link: "" });
    setMode("add");
    setFormVisible(true);
    setSelectedProjectId("");
  };

  const openEditMode = () => {
    setMode("edit");
    setFormVisible(false);
    setSelectedProjectId("");
  };

  const openDeleteMode = () => {
    setMode("delete");
    setFormVisible(false);
    setSelectedProjectId("");
  };

  const handleEditSelect = (e) => {
    const id = parseInt(e.target.value);
    setSelectedProjectId(id);
    const proj = projects.find((p) => p.id === id);
    if (proj) {
      setFormData({
        title: proj.title,
        description: proj.description,
        tech: proj.tech.join(", "),
        link: proj.link,
      });
      setFormVisible(true);
    } else {
      setFormVisible(false);
      setFormData({ title: "", description: "", tech: "", link: "" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Title is required.");
      return;
    }

    const techArray = formData.tech
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    if (mode === "add") {
      const newProject = {
        id: Date.now(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        tech: techArray,
        link: formData.link.trim(),
      };
      setProjects((prev) => [...prev, newProject]);
    } else if (mode === "edit") {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProjectId
            ? {
                ...p,
                title: formData.title.trim(),
                description: formData.description.trim(),
                tech: techArray,
                link: formData.link.trim(),
              }
            : p
        )
      );
    }

    setFormVisible(false);
    setMode(null);
    setSelectedProjectId("");
    setFormData({ title: "", description: "", tech: "", link: "" });
  };

  const handleDelete = () => {
    if (!selectedProjectId) {
      alert("Select a project to delete.");
      return;
    }
    if (
      window.confirm(
        `Are you sure you want to delete project with id ${selectedProjectId}?`
      )
    ) {
      setProjects((prev) => prev.filter((p) => p.id !== selectedProjectId));
      setSelectedProjectId("");
      setMode(null);
    }
  };

  return (
    <div className="projects-section">
      <h2 className="section-heading">Projects</h2>
      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {!formVisible && (
          <>
            <button onClick={openAddForm}>Add New Project</button>
            <button onClick={openEditMode}>Edit Project</button>
            <button onClick={openDeleteMode}>Delete Project</button>
          </>
        )}
      </div>

      {mode === "edit" && !formVisible && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <label htmlFor="editSelect" style={{ display: "block" }}>
            Select Project to Edit:
          </label>
          <select
            id="editSelect"
            value={selectedProjectId}
            onChange={handleEditSelect}
            style={{ padding: "6px", width: "100%" }}
          >
            <option value="">-- Select project --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
          <button
            onClick={() => setMode(null)}
            style={{ padding: "6px 12px" }}
          >
            Cancel
          </button>
        </div>
      )}

      {mode === "delete" && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <label htmlFor="deleteSelect" style={{ display: "block" }}>
            Select Project to Delete:
          </label>
          <select
            id="deleteSelect"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(parseInt(e.target.value))}
            style={{ padding: "6px", width: "100%" }}
          >
            <option value="">-- Select project --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
          <div>
            <button onClick={handleDelete} style={{ padding: "6px 12px" }}>
              Confirm Delete
            </button>
            <button
              onClick={() => {
                setMode(null);
                setSelectedProjectId("");
              }}
              style={{ padding: "6px 12px", marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {(formVisible && (mode === "add" || mode === "edit")) && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "20px",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ padding: "6px", width: "100%" }}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              style={{ padding: "6px", width: "100%" }}
            />
          </label>
          <label>
            Technologies (comma separated):
            <input
              type="text"
              name="tech"
              value={formData.tech}
              onChange={handleChange}
              style={{ padding: "6px", width: "100%" }}
            />
          </label>
          <label>
            Link:
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              style={{ padding: "6px", width: "100%" }}
            />
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={{ padding: "6px 12px" }}>
              {mode === "add" ? "Add Project" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormVisible(false);
                setMode(null);
                setSelectedProjectId("");
              }}
              style={{ padding: "6px 12px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Projects;
