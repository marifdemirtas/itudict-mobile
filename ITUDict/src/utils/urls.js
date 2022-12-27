export const backendApi = {
  auth: {
    login: "/auth/signin/",
    register: "/auth/signup/",
    logout: "/auth/logout/",
    refresh: "/auth/refresh/"
  },
  topic: {
    create: "/topic/create",
    latest: "/topic/latest/",
    popular: "/topic/popular/"
  },
  comment: {
    create: "/comment/create/",
    getByTopic: (topicId, page, limit) => {
      return "/comment/topic/" + topicId + "/" + page + "/" + limit + "/";
    },
    getByOwner: (id, page, limit) => {
      return "/comment/owner/" + id + "/" + page + "/" + limit + "/";
    },
    like: (id) => {
      return "/comment/like/" + id;
    },
    dislike: (id) => {
      return "/comment/dislike/" + id;
    }
  },
  user: {
    get: "/user/",
    find: (email) => {
      return "/user/find/" + email;
    }
  }
};
