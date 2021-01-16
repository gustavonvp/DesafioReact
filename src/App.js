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
    
    const [repositories, setRepositories] = useState([])
    
    useEffect(() => {
        api.get('repositories').then(response=>{
            setRepositories(response.data)
        })    
    },[])

    async function handleAddRepository() {
        //projects.push(`Novo projeto ${Date.now()}`)
        //setProjects([...projects, `Novo projeto ${Date.now()}`])
        
        const response = await api.post('repositories', {
            title: `Novo repositorio ${Date.now()}`,
            url: "https://github.com/gustavonvp/DesafioNodeJs",
            techs: "NodeJS, React e React Native",
            likes: 3
        })

        const repository = response.data

        setRepositories([...repositories, repository])
        
    }

    async function handleRemoveRepository(id) {
        await api.delete(`repository/${id}`);
        
        setRepositories(repositories.filter(
            repositories => repository.id !== id
        ))
    
    }

    return (
<>
    <Header title="Repository"></Header>
        
        <img width="300" src={backgroundImage} ></img>
        
        <ul data-testid="repository-list">
            {repositories.map(repository => 
                <li key={repository.id}>{repository.title}
                    
                    <button type="button" onClick={() => handleRemoveRepository(project.id)}>Remover Repositorio</button>
        
                </li>
            )}  
        </ul>


        <button type="button" onClick={handleAddRepository}>Adicionar Repositorio</button>
</>
)

}

export default App
