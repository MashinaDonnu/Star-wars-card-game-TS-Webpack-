export const engineData = {
  // loadersImagePromises: new Map<string, Set<Promise<HTMLImageElement>>>(),
  loadersImagePromises: new Set<Promise<HTMLImageElement>>(),
  loaders: {
    image: new Map<string, Map<string, HTMLImageElement>>(),
  },
};
