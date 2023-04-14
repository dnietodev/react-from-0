import './App.css'
import { Dashboard } from './sections/dashboard/Dashboard'
import { GitHubApiGitHubRepositoryRepository } from './infraestructure/GitHubApiGitHubRepositoryRepository'
import { config } from './devdash_config'

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

function App() {

  return (
    <Dashboard repository={repository}/>
  )
}

export default App
