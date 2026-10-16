const { execSync } = require("node:child_process");

function commitFiles(hash) {
  try {
    const out = execSync(`git diff-tree --no-commit-id --name-only -r ${hash}`, {
      encoding: "utf8",
    });
    return out.split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

function commitTouchesService(hash, pathPrefix, excludePrefixes = []) {
  return commitFiles(hash).some((file) => {
    if (!file.startsWith(pathPrefix)) return false;
    return !excludePrefixes.some((ex) => file.startsWith(ex));
  });
}

/**
 * Keep only commits that touch a service path so each service gets its own semver.
 * Mutates context.commits before @semantic-release/commit-analyzer runs.
 */
function analyzeCommits(pluginConfig, context) {
  const pathPrefix = pluginConfig.path;
  if (!pathPrefix) {
    throw new Error("filter-service-commits: pluginConfig.path is required");
  }
  const exclude = pluginConfig.exclude || [];

  const before = context.commits.length;
  context.commits = context.commits.filter((commit) =>
    commitTouchesService(commit.hash, pathPrefix, exclude),
  );
  context.logger.log(
    `Filtered commits for ${pathPrefix} (exclude=${JSON.stringify(exclude)}): ${before} → ${context.commits.length}`,
  );
  return null;
}

module.exports = { analyzeCommits };
