export const engineData = {
  loadersImagePromises: new Set<Promise<HTMLImageElement>>(),
  loaders: {
    image: new Map<string, Map<string, HTMLImageElement>>(),
  },
};
