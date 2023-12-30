'use client';
 
import { type EdgeStoreRouter } from '../app/api/edgestore/[...edgestore]/route';
import { createEdgeStoreProvider } from '@edgestore/react';
import { type InferClientResponse } from '@edgestore/server/core';
 
const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();
 
export { EdgeStoreProvider, useEdgeStore };

// ...
/**
 * This helper type can be used to infer the response type of the backend client
 */
export type ClientResponse = InferClientResponse<EdgeStoreRouter>;