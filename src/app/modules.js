import Router from "@cerebral/router";

export const router = Router({
  onlyHash: true,
  query: true,
  routes: [
    { path: "/", signal: "rootRouted" },
  ]
});

