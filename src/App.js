import React, {useState, useEffect} from 'react'
import Header from './components/Header'

import './App.css'
import backgroundImage from './images/background.png'

import api from './services/api'

/**
 * 
 * Componente
 * Propriedade                           Conceitos Fundamentais 
 * Estado & Imutabilidade
 * 
 */



function App(){
    
    const [projects, setProjects] = useState([])
    
    useEffect(() => {
        api.get('projects').then(response=>{
            setProjects(response.data)
        })    
    },[])

    async function handleAddProject() {
        //projects.push(`Novo projeto ${Date.now()}`)
        //setProjects([...projects, `Novo projeto ${Date.now()}`])
        
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            url: "https://github.com/gustavonvp/DesafioNodeJs",
            techs: "NodeJS, React e React Native",
            likes: 3
        })

        const project = response.data

        setProjects([...projects, project])
        
    }

    async function handleDeleteProject(id) {
        await api.delete(`projects/${id}`);
        
        setProjects(projects.filter(
            project => project.id !== id
        ))
    
    }

    return (
<>
    <Header title="Projects"></Header>
        
        <img width="300" src={backgroundImage} ></img>
        
        <ul data-testid="repository-list">
            {projects.map(project => 
                <li key={project.id}>{project.title}
                    
                    <button type="button" onClick={() => handleDeleteProject(project.id)}>Remover Projeto</button>
        
                </li>
            )}  
        </ul>


        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
</>
)

}

export default App