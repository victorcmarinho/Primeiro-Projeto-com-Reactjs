import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => setRepositories([...repositories, ...response.data]));
  }, []);

  async function handleAddRepository() {
    api.post('repositories', {
      "url": "https://github.com/victorcmarinho",
      "title": `Victor - ${Date.now()}`,
      "techs": ["Node", "Express", "TypeScript"]
    }).then(
      response => setRepositories([...repositories, response.data])
    );
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`repositories/${id}`);

    if (status === 204) {
      const index = repositories.findIndex(r => r.id === id);
      repositories.splice(index, 1);
      setRepositories([...repositories]);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
