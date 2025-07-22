import React from 'react';

const ProjectCard = ({ project }) => (
  <div className="project-card">

    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <p><strong>Tech:</strong> {project.tech.join(', ')}</p>
    <a href={project.link} target="_blank">View Project</a>
  </div>
);

export default ProjectCard;
