const registerPodlets = (layout) => {
  const podletA = layout.client.register({
    name: "podlet-a",
    uri: "http://localhost:7100/manifest.json",
    resolveJs: true,
    resolveCss: true,
  });

  const podletB = layout.client.register({
    name: "podlet-b",
    uri: "http://localhost:7200/manifest.json",
    resolveJs: true,
    resolveCss: true,
  });

  const podletC = layout.client.register({
    name: "podlet-c",
    uri: "http://localhost:7300/manifest.json",
    resolveJs: true,
    resolveCss: true,
  });

  return {
    podletA,
    podletB,
    podletC,
  };
};

module.exports = registerPodlets;
