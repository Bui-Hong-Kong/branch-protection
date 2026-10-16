import { SERVICES } from "./services.mjs";

const service = process.env.SERVICE;

if (!service) {
  throw new Error("SERVICE env var is required (e.g. carts, frontend)");
}

const spec = SERVICES[service];
if (!spec) {
  throw new Error(
    `Unknown SERVICE "${service}". Known: ${Object.keys(SERVICES).join(", ")}`,
  );
}

/** @type {import('semantic-release').Options} */
export default {
  branches: ["main"],
  tagFormat: `${service}-v\${version}`,
  plugins: [
    [
      "./release/filter-service-commits.cjs",
      { path: spec.path, exclude: spec.exclude || [] },
    ],
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/github",
      {
        successComment: false,
        failComment: false,
        releasedLabels: false,
      },
    ],
  ],
};
