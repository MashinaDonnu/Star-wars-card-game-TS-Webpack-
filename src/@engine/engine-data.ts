export const engineData = {
  loadersImagePromises: new Set<Promise<HTMLImageElement>>(),
  loadersAudioPromises: new Set<Promise<HTMLAudioElement>>(),
  loaders: {
    image: new Map<string, Map<string, HTMLImageElement>>(),
    audio: new Map<string, Map<string, HTMLAudioElement>>(),
  },
};
