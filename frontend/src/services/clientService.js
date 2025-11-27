export const clientService = {
  dashboard: () =>
    fetch("/api/client/dashboard").then((res) => res.json()),

  projects: () =>
    fetch("/api/client/projects").then((res) => res.json()),

  payments: () =>
    fetch("/api/client/payments").then((res) => res.json()),

  history: () =>
    fetch("/api/client/project-history").then((res) => res.json()),

  profile: () =>
    fetch("/api/client/profile").then((res) => res.json()),

  updateProfile: (data) =>
    fetch("/api/client/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
};
