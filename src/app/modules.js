import Router from "@cerebral/router";
import StorageProvider from "@cerebral/storage";

export const router = Router({
  onlyHash: true,
  query: true,
  routes: [
    { path: "/", signal: "rootRouted" },
  ]
});

