import { render, screen } from "@testing-library/react"
import { Dashboard } from "../src/sections/dashboard/Dashboard";
import React from "react";
import { githubApiResponses  } from "../src/github_api_responses";
import { GitHubRepositoryMother } from "./GitHubRepositoryMother";
import { GitHubRepositoryRepository } from "../src/domain/GitHubRepositoryRepository";
import { mock } from 'vitest-mock-extended';

const mockRepository = mock<GitHubRepositoryRepository>();

describe("Dashboard section", () => {
    it("show all widgets", async () => {
        const gitHubRepository = GitHubRepositoryMother.create();
        mockRepository.search.mockResolvedValue([gitHubRepository]);
        render(<Dashboard repository={mockRepository}/>)
        const title = await screen.findByRole("heading", {
			name: new RegExp("DevDash_", "i"),
		});

        const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`;
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});
        expect(title).toBeInTheDocument();
        expect(firstWidgetHeader).toBeInTheDocument();
    })
})