export const engineData = {
  loadersPromises: new Map<string, Set<Promise<HTMLImageElement>>>(),
  loaders: {
    image: new Map<string, Map<string, HTMLImageElement>>(),
  },
  sprites: {},
};
