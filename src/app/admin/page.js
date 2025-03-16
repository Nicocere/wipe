"use client";

import React, { useState } from 'react';
import { baseDeDatos } from '@/config/FireBaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import styles from './AddProjectForm.module.css';

const AddProjectForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        client: '',
        year: '',
        techStack: [],
        mainImage: '',
        mobileView: '',
        ourMission: {
            text1: '',
            text2: '',
            text3: ''
        },
        aboutProject: {
            text1: '',
            text2: '',
            text3: ''
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTechStackChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData({ ...formData, techStack: [...formData.techStack, value] });
        } else {
            setFormData({ ...formData, techStack: formData.techStack.filter((tech) => tech !== value) });
        }
    };

    const handleImageSelect = (e, field) => {
        const filePath = `/pages-examples/page-details/${e.target.value}`;
        setFormData({ ...formData, [field]: filePath });
    };

    const handleArrayChange = (e, field, key) => {
        const { value } = e.target;
        setFormData({ ...formData, [field]: { ...formData[field], [key]: value } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(baseDeDatos, 'projects'), {
                ...formData,
                year: Number(formData.year),    
            });
            alert('Project added successfully!');
            setFormData({
                title: '',
                client: '',
                year: '',
                techStack: [],
                mainImage: '',
                mobileView: '',
                ourMission: {
                    text1: '',
                    text2: '',
                    text3: ''
                },
                aboutProject: {
                    text1: '',
                    text2: '',
                    text3: ''
                },
            });
        } catch (error) {
            console.error('Error adding project: ', error);
            alert('Error adding project');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Add New Project</h2>
            <label>
                Title:
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </label>
            <label>
                Client:
                <input type="text" name="client" value={formData.client} onChange={handleChange} required />
            </label>
            <label>
                Year:
                <input type="number" name="year" value={formData.year} onChange={handleChange} required min="1900" max={new Date().getFullYear()} />
            </label>
            <fieldset>
                <legend>Tech Stack:</legend>
                <label>
                    <input type="checkbox" value="Next JS" onChange={handleTechStackChange} />
                    Next JS
                </label>
                <label>
                    <input type="checkbox" value="React JS" onChange={handleTechStackChange} />
                    React JS
                </label>
                <label>
                    <input type="checkbox" value="NodeJS" onChange={handleTechStackChange} />
                    NodeJS
                </label>
                <label>
                    <input type="checkbox" value="Express" onChange={handleTechStackChange} />
                    Express
                </label>
                <label>
                    <input type="checkbox" value="Firebase" onChange={handleTechStackChange} />
                    Firebase
                </label>
                <label>
                    <input type="checkbox" value="Material UI" onChange={handleTechStackChange} />
                    Material UI
                </label>
                <label>
                    <input type="checkbox" value="Vercel" onChange={handleTechStackChange} />
                    Vercel
                </label>
                <label>
                    <input type="checkbox" value="React-Spring" onChange={handleTechStackChange} />
                    React-Spring
                </label>
                <label>
                    <input type="checkbox" value="SEO" onChange={handleTechStackChange} />
                    SEO
                </label>
                <label>
                    <input type="checkbox" value="Diseño UX/UI" onChange={handleTechStackChange} />
                    Diseño UX/UI
                </label>
            </fieldset>
            <label>
                Main Image:
                <input type="text" name="mainImage" placeholder="Enter image filename" onChange={(e) => handleImageSelect(e, 'mainImage')} required />
            </label>
            <label>
                Mobile View Image:
                <input type="text" name="mobileView" placeholder="Enter image filename" onChange={(e) => handleImageSelect(e, 'mobileView')} required />
            </label>
            <fieldset>
                <legend>Our Mission:</legend>
                <label>
                    Text 1:
                    <textarea 
                        value={formData.ourMission.text1} 
                        onChange={(e) => handleArrayChange(e, 'ourMission', 'text1')} 
                        required 
                    />
                </label>
                <label>
                    Text 2:
                    <textarea 
                        value={formData.ourMission.text2} 
                        onChange={(e) => handleArrayChange(e, 'ourMission', 'text2')} 
                        required 
                    />
                </label>
                <label>
                    Text 3:
                    <textarea 
                        value={formData.ourMission.text3} 
                        onChange={(e) => handleArrayChange(e, 'ourMission', 'text3')} 
                        required 
                    />
                </label>
            </fieldset>
            <fieldset>
                <legend>About Project:</legend>
                <label>
                    Text 1:
                    <textarea 
                        value={formData.aboutProject.text1} 
                        onChange={(e) => handleArrayChange(e, 'aboutProject', 'text1')} 
                        required 
                    />
                </label>
                <label>
                    Text 2:
                    <textarea 
                        value={formData.aboutProject.text2} 
                        onChange={(e) => handleArrayChange(e, 'aboutProject', 'text2')} 
                        required 
                    />
                </label>
                <label>
                    Text 3:
                    <textarea 
                        value={formData.aboutProject.text3} 
                        onChange={(e) => handleArrayChange(e, 'aboutProject', 'text3')} 
                        required 
                    />
                </label>
            </fieldset>
            <button type="submit">Add Project</button>
        </form>
    );
};

export default AddProjectForm;