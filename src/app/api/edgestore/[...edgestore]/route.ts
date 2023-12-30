import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { initEdgeStoreClient } from '@edgestore/server/core';

const es = initEdgeStore.create();
 
export const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
});
 
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };
 

export type EdgeStoreRouter = typeof edgeStoreRouter;
