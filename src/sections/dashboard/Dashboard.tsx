import { config } from "../../devdash_config";

export function Dashboard() {
  const title = "DevDash";

  return (
    <>
      <h1>{title}</h1>
      <ul>
        {config.widgets.map((widget) => (
          <li key={widget.id}>{widget.repository_url}</li>
        ))}
      </ul>
    </>
  );
}
