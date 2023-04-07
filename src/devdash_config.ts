export interface DevDashConfig {
    github_access_token: string,
    widgets: {
        id: string,
        repository_url: string
    }[]
}

export const config: DevDashConfig = {
    github_access_token: import.meta.env.GITHUB_ACCESS_TOKEN,
    widgets: [
        {
            id: '617950f4-85b0-450e-805b-1ce4a3721e4b',
            repository_url:  'https://github.com/ionic-team/ionic-framework',
        },
        {
            id: '8942fe6e-6189-4c44-b6a8-d48a00d8764b',
            repository_url:  'https://github.com/dnietodev/ng-standalone-components-starter',
        },
        {
            id: '42c74f76-5544-4533-befc-5f64df956b05',
            repository_url:  'https://github.com/ionic-team/capacitor-plugins',
        },
    ],
}