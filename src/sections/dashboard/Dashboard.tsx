import { ReactComponent as Lock } from "../../assets/lock.svg";
import { ReactComponent as Unlock } from "../../assets/unlock.svg";
import { ReactComponent as Check } from "../../assets/check.svg";
import { ReactComponent as Error } from "../../assets/error.svg";
import { ReactComponent as Start } from "../../assets/start.svg";
import { ReactComponent as Watchers } from "../../assets/watchers.svg";
import { ReactComponent as Forks } from "../../assets/forks.svg";
import { ReactComponent as IssueOpened } from "../../assets/issueOpened.svg";
import { ReactComponent as PullRequests } from "../../assets/pullRequests.svg";

import styles from "./Dashboard.module.scss";
import { useEffect, useState } from "react";
import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infraestructure/GitHubApiGitHubRepositoryRepository";
import { GitHubApiResponses } from "../../infraestructure/GitHubApiResponses";
import { GitHubRepository } from "../../domain/GitHubRepository";

const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
});

const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

function isoToReadableDate(date: Date) {
  let duration = (date.getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(
        Math.round(duration),
        division.name as Intl.RelativeTimeFormatUnit
      );
    }
    duration /= division.amount;
  }
}



export function Dashboard() {
  const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);
	const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
			});
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			{repositoryData.length === 0 ? (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			) : (
				<section className={styles.container}>
					{repositoryData.map((widget) => (
						<article className={styles.widget} key={`${widget.id.organization}/${widget.id.name}`}>
							<header className={styles.widget__header}>
								<h2 className={styles.widget__title}>
									<a
										href={widget.url}
										target="_blank"
										title={`${widget.id.organization}/${widget.id.name}`}
										rel="noreferrer"
									>
										{widget.id.organization}/{widget.id.name}
									</a>
								</h2>
								{widget.private ? <Lock /> : <Unlock />}
							</header>
							<div className={styles.widget__body}>
								<div className={styles.widget__status}>
									<p>Last update {isoToReadableDate(widget.updatedAt)}</p>
									{widget.hasWorkflows && (
										<div>{widget.isLastWorkflowSuccess ? <Check /> : <Error />}</div>
									)}
								</div>
								<p className={styles.widget__description}>{widget.description}</p>
							</div>
							<footer className={styles.widget__footer}>
								<div className={styles.widget__stat}>
									<Start />
									<span>{widget.stars}</span>
								</div>
								<div className={styles.widget__stat}>
									<Watchers />
									<span>{widget.watchers}</span>
								</div>
								<div className={styles.widget__stat}>
									<Forks />
									<span>{widget.forks}</span>
								</div>
								<div className={styles.widget__stat}>
									<IssueOpened />
									<span>{widget.issues}</span>
								</div>
								<div className={styles.widget__stat}>
									<PullRequests />
									<span>{widget.pullRequests}</span>
								</div>
							</footer>
						</article>
					))}
				</section>
			)}
		</>
	);
}
