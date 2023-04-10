import { githubApiResponses } from "../../github_api_responses";
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

const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'auto'
})

const DIVISIONS = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' }
]

function isoToRedableDate(date: string) {
  const lastUpdate = new Date(date)
  let duration = (lastUpdate.getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i]
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name as Intl.RelativeTimeFormatUnit)
    }
    duration /= division.amount
  }
}

export function Dashboard() {
  const title = "DevDash";

  return (
    <>
      <header className={styles.container}>
        <h1>{title}</h1>
      </header>
      <section className={styles.container}>
				{githubApiResponses.map((widget) => (
					<article className={styles.widget} key={widget.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.repositoryData.html_url}
								target="_blank"
								title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
								rel="noreferrer"
							>
								{widget.repositoryData.organization.login}/{widget.repositoryData.name}
							</a>
							{widget.repositoryData.private ? <Lock /> : <Unlock />}
						</header>
						<div className={styles.widget__body}>
							<div className={styles.widget__status}>
								<p>Last update {isoToRedableDate(widget.repositoryData.updated_at)}</p>
								{widget.CiStatus.workflow_runs.length > 0 && (
									<div>
										{widget.CiStatus.workflow_runs[0].status === "completed" ? (
											<Check />
										) : (
											<Error />
										)}
									</div>
								)}
							</div>
							<p className={styles.widget__description}>{widget.repositoryData.description}</p>
						</div>
						<footer className={styles.widget__footer}>
							<div className={styles.widget__stat}>
								<Start />
								<span>{widget.repositoryData.stargazers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<Watchers />
								<span>{widget.repositoryData.watchers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<Forks />
								<span>{widget.repositoryData.forks_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<IssueOpened />
								<span>{widget.repositoryData.open_issues_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<PullRequests />
								<span>{widget.pullRequest.length}</span>
							</div>
						</footer>
					</article>
				))}
			</section>
    </>
  );
}
