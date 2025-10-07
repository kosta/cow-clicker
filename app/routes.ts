import {
  type RouteConfig,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("cow", "./routes/cow.tsx"),
] satisfies RouteConfig;
