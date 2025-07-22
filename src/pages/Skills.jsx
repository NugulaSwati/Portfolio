import React, { useState, useEffect } from 'react';
import '../App.css';
import SkillCircle from '../components/SkillCircle';

import initialSkills from '../data/skills';

const Skills = () => {
  const [skills, setSkills] = useState(() => {
    const stored = localStorage.getItem('skills');
    return stored ? JSON.parse(stored) : initialSkills;
  });

  const [mode, setMode] = useState(null); 
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillPercentage, setSkillPercentage] = useState('');

  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  const openAddForm = () => {
    setSkillName('');
    setSkillPercentage('');
    setMode('add');
    setFormVisible(true);
    setSelectedSkillIndex(null);
  };

  const openEditMode = () => {
    setMode('edit');
    setFormVisible(false);
    setSelectedSkillIndex(null);
  };

  const openDeleteMode = () => {
    setMode('delete');
    setFormVisible(false);
    setSelectedSkillIndex(null);
  };

  const handleEditSelect = (e) => {
    const index = e.target.value === '' ? null : parseInt(e.target.value, 10);
    setSelectedSkillIndex(index);
    if (index !== null) {
      setSkillName(skills[index].name);
      setSkillPercentage(skills[index].percentage.toString());
      setFormVisible(true);
    } else {
      setFormVisible(false);
      setSkillName('');
      setSkillPercentage('');
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'name') {
      setSkillName(e.target.value);
    } else if (e.target.name === 'percentage') {
      let val = e.target.value;
      if (val === '') setSkillPercentage('');
      else if (!isNaN(val) && Number(val) >= 0 && Number(val) <= 100) {
        setSkillPercentage(val);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!skillName.trim()) {
      alert('Skill name is required.');
      return;
    }
    if (skillPercentage === '' || isNaN(skillPercentage)) {
      alert('Skill percentage must be a number between 0 and 100.');
      return;
    }
    const newSkill = {
      name: skillName.trim(),
      percentage: Number(skillPercentage),
    };

    if (mode === 'add') {
      setSkills((prev) => [...prev, newSkill]);
    } else if (mode === 'edit' && selectedSkillIndex !== null) {
      setSkills((prev) =>
        prev.map((s, i) => (i === selectedSkillIndex ? newSkill : s))
      );
    }

    setFormVisible(false);
    setMode(null);
    setSelectedSkillIndex(null);
    setSkillName('');
    setSkillPercentage('');
  };

  const handleDelete = () => {
    if (selectedSkillIndex === null) {
      alert('Select a skill to delete.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this skill?')) {
      setSkills((prev) => prev.filter((_, i) => i !== selectedSkillIndex));
      setSelectedSkillIndex(null);
      setMode(null);
    }
  };

  return (
    <div style={{ minHeight: 'auto', padding: '10px' }}>
      <section>
        <h2 style={{ color: 'white', textAlign: 'center' }}>Skills</h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '30px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {skills.map((s, i) => (
            <SkillCircle key={i} skill={s} />
          ))}
        </div>
      </section>

      {}
      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {!formVisible && (
          <>
            <button onClick={openAddForm}>Add Skill</button>
            <button onClick={openEditMode}>Edit Skill</button>
            <button onClick={openDeleteMode}>Delete Skill</button>
          </>
        )}
      </div>

      {}
      {mode === 'edit' && !formVisible && (
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            maxWidth: '300px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <label htmlFor="editSelect" style={{ display: 'block', color: 'white' }}>
            Select Skill to Edit:
          </label>
          <select
            id="editSelect"
            value={selectedSkillIndex === null ? '' : selectedSkillIndex}
            onChange={handleEditSelect}
            style={{ padding: '6px', width: '100%' }}
          >
            <option value="">-- Select skill --</option>
            {skills.map((s, i) => (
              <option key={i} value={i}>
                {s.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setMode(null)}
            style={{ padding: '6px 12px', marginTop: '5px' }}
          >
            Cancel
          </button>
        </div>
      )}

      {}
      {mode === 'delete' && (
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            maxWidth: '300px',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: 'white',
          }}
        >
          <label htmlFor="deleteSelect" style={{ display: 'block' }}>
            Select Skill to Delete:
          </label>
          <select
            id="deleteSelect"
            value={selectedSkillIndex === null ? '' : selectedSkillIndex}
            onChange={(e) =>
              setSelectedSkillIndex(
                e.target.value === '' ? null : parseInt(e.target.value, 10)
              )
            }
            style={{ padding: '6px', width: '100%' }}
          >
            <option value="">-- Select skill --</option>
            {skills.map((s, i) => (
              <option key={i} value={i}>
                {s.name}
              </option>
            ))}
          </select>
          <div>
            <button onClick={handleDelete} style={{ padding: '6px 12px' }}>
              Confirm Delete
            </button>
            <button
              onClick={() => {
                setMode(null);
                setSelectedSkillIndex(null);
              }}
              style={{ padding: '6px 12px', marginLeft: '10px' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {}
      {(formVisible && (mode === 'add' || mode === 'edit')) && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: '20px',
            maxWidth: '300px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <label style={{ color: 'white' }}>
            Skill Name:
            <input
              type="text"
              name="name"
              value={skillName}
              onChange={handleInputChange}
              required
              style={{ padding: '6px', width: '100%', marginTop: '4px' }}
            />
          </label>

          <label style={{ color: 'white' }}>
            Skill Percentage (0-100):
            <input
              type="number"
              name="percentage"
              value={skillPercentage}
              onChange={handleInputChange}
              required
              min="0"
              max="100"
              style={{ padding: '6px', width: '100%', marginTop: '4px' }}
            />
          </label>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ padding: '6px 12px' }}>
              {mode === 'add' ? 'Add Skill' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormVisible(false);
                setMode(null);
                setSelectedSkillIndex(null);
                setSkillName('');
                setSkillPercentage('');
              }}
              style={{ padding: '6px 12px' }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Skills;
