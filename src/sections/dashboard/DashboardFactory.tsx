import React from "react";
import { GitHubApiGitHubRepositoryRepository } from "../../infraestructure/GitHubApiGitHubRepositoryRepository";
import { config } from "../../devdash_config";
import { Dashboard } from "./Dashboard";


const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);


export class DashboardFactory {
    static create(): React.ReactElement {
        return <Dashboard repository={repository}/>
    }
}