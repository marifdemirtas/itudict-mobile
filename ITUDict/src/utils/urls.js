//TODO: After backend is ready, change the api uri's to the backend api uri's
export const backendApi = {
  auth: {
    login: "/auth/signin/",
    register: "/auth/signup/",
    logout: "/auth/logout/",
    refresh: "/auth/refresh/"
  },
  topic: {
    create: "/topic/create/",
    latest: "/topic/latest/",
    popular: "/topic/popular/"
  }
};
