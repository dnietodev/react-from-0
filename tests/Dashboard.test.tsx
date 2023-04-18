import { render, screen } from "@testing-library/react"
import { Dashboard } from "../src/sections/dashboard/Dashboard";
import React, { ReactElement } from "react";
import { githubApiResponses  } from "../src/github_api_responses";
import { GitHubRepositoryMother } from "./GitHubRepositoryMother";
import { GitHubRepositoryRepository } from "../src/domain/GitHubRepositoryRepository";
import { mock } from 'vitest-mock-extended';
import { BrowserRouter } from "react-router-dom";

const mockRepository = mock<GitHubRepositoryRepository>();

export const renderWithRouter = (ui: ReactElement, { route = "/" } = {}) => {
	window.history.pushState({}, "Test page", route);

	return {
		...render(ui, { wrapper: BrowserRouter }),
	};
};

describe("Dashboard section", () => {
    it("show all widgets", async () => {
        const gitHubRepository = GitHubRepositoryMother.create();
        mockRepository.search.mockResolvedValue([gitHubRepository]);
        renderWithRouter(<Dashboard repository={mockRepository}/>)
        /* const title = await screen.findByRole("heading", {
			name: new RegExp("DevDash_", "i"),
		}); */

        const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`;
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});
       /*  expect(title).toBeInTheDocument(); */
        expect(firstWidgetHeader).toBeInTheDocument();
    })
    it("show not results message when there are no widgets", async () => {
		mockRepository.search.mockResolvedValue([]);

		render(<Dashboard repository={mockRepository} />);

		const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

		expect(noResults).toBeInTheDocument();
	});

	it("show last modified date in human readable format", async () => {
		const gitHubRepository = GitHubRepositoryMother.create({ updatedAt: new Date() });

		mockRepository.search.mockResolvedValue([gitHubRepository]);

		render(<Dashboard repository={mockRepository} />);

		const modificationDate = await screen.findByText(new RegExp("now", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
})