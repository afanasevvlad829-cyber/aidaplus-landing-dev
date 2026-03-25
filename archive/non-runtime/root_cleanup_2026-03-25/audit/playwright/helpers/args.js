function parseViewport(value) {
  if (!value) return null;
  const match = String(value).match(/^(\d+)x(\d+)$/i);
  if (!match) return null;

  return {
    width: Number(match[1]),
    height: Number(match[2])
  };
}

function parseCliArgs(argv) {
  const args = {
    url: "",
    viewportPreset: "",
    viewport: null,
    runId: "",
    headless: undefined
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const next = argv[i + 1];

    if (token === "--url" && next) {
      args.url = next;
      i += 1;
      continue;
    }

    if (token === "--viewport-preset" && next) {
      args.viewportPreset = next;
      i += 1;
      continue;
    }

    if (token === "--viewport" && next) {
      args.viewport = parseViewport(next);
      i += 1;
      continue;
    }

    if (token === "--run-id" && next) {
      args.runId = next;
      i += 1;
      continue;
    }

    if (token === "--headed") {
      args.headless = false;
      continue;
    }

    if (token === "--headless") {
      args.headless = true;
      continue;
    }
  }

  return args;
}

module.exports = {
  parseCliArgs,
  parseViewport
};
