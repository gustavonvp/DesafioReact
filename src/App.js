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
        async function loadData() {
            const response = await 
                api.get('repositories');

            const loadedRepositories = response.data;

            setRepositories(loadedRepositories);
        }

    loadData();
        
    },[]);

    async function handleAddRepository() {
        //projects.push(`Novo projeto ${Date.now()}`)
        //setProjects([...projects, `Novo projeto ${Date.now()}`])
        
        const newRepository = 
        
        {
            title: `New Repository ${Date.now()}`,
            url: "localhost:3333",
            techs: ["NodeJS", "React"]
        }

        const response = await api.post('/repositories', newRepository);
        
        const repository = response.data

        if(response.status === 200) {
            setRepositories([...repositories, repository])
        }
    }

    async function handleRemoveRepository(id) {
        const response = await api.delete(`repositories/${id}`);

        if(response.status === 204){
            const currentRepositories = repositories.filter(repository => repository.id !== id)
            setRepositories(currentRepositories);
        }
    }

    return (
<>
    <Header title="Repository"></Header>
        
        <img width="300" src={backgroundImage} ></img>
        
        <ul data-testid="repository-list">
            {repositories.map(repository => 
                <li key={repository.id}>{repository.title}
                    
                    <button type="button" onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
        
                </li>
            )}  
        </ul>


        <button type="button" onClick={handleAddRepository}>Adicionar</button>
</>
)

}

export default App
