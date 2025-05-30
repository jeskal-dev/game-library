/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/auth'
import { Route as appAppImport } from './routes/(app)/_app'
import { Route as appAppIndexImport } from './routes/(app)/_app.index'
import { Route as appAppExploreImport } from './routes/(app)/_app.explore'

// Create Virtual Routes

const appImport = createFileRoute('/(app)')()

// Create/Update Routes

const appRoute = appImport.update({
  id: '/(app)',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const appAppRoute = appAppImport.update({
  id: '/_app',
  getParentRoute: () => appRoute,
} as any)

const appAppIndexRoute = appAppIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => appAppRoute,
} as any)

const appAppExploreRoute = appAppExploreImport.update({
  id: '/explore',
  path: '/explore',
  getParentRoute: () => appAppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/(app)': {
      id: '/(app)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_app': {
      id: '/(app)/_app'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appAppImport
      parentRoute: typeof appRoute
    }
    '/(app)/_app/explore': {
      id: '/(app)/_app/explore'
      path: '/explore'
      fullPath: '/explore'
      preLoaderRoute: typeof appAppExploreImport
      parentRoute: typeof appAppImport
    }
    '/(app)/_app/': {
      id: '/(app)/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appAppIndexImport
      parentRoute: typeof appAppImport
    }
  }
}

// Create and export the route tree

interface appAppRouteChildren {
  appAppExploreRoute: typeof appAppExploreRoute
  appAppIndexRoute: typeof appAppIndexRoute
}

const appAppRouteChildren: appAppRouteChildren = {
  appAppExploreRoute: appAppExploreRoute,
  appAppIndexRoute: appAppIndexRoute,
}

const appAppRouteWithChildren =
  appAppRoute._addFileChildren(appAppRouteChildren)

interface appRouteChildren {
  appAppRoute: typeof appAppRouteWithChildren
}

const appRouteChildren: appRouteChildren = {
  appAppRoute: appAppRouteWithChildren,
}

const appRouteWithChildren = appRoute._addFileChildren(appRouteChildren)

export interface FileRoutesByFullPath {
  '/auth': typeof AuthRoute
  '/': typeof appAppIndexRoute
  '/explore': typeof appAppExploreRoute
}

export interface FileRoutesByTo {
  '/auth': typeof AuthRoute
  '/explore': typeof appAppExploreRoute
  '/': typeof appAppIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/auth': typeof AuthRoute
  '/(app)': typeof appRouteWithChildren
  '/(app)/_app': typeof appAppRouteWithChildren
  '/(app)/_app/explore': typeof appAppExploreRoute
  '/(app)/_app/': typeof appAppIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/auth' | '/' | '/explore'
  fileRoutesByTo: FileRoutesByTo
  to: '/auth' | '/explore' | '/'
  id:
    | '__root__'
    | '/auth'
    | '/(app)'
    | '/(app)/_app'
    | '/(app)/_app/explore'
    | '/(app)/_app/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRoute
  appRoute: typeof appRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRoute,
  appRoute: appRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/auth",
        "/(app)"
      ]
    },
    "/auth": {
      "filePath": "auth.tsx"
    },
    "/(app)": {
      "filePath": "(app)",
      "children": [
        "/(app)/_app"
      ]
    },
    "/(app)/_app": {
      "filePath": "(app)/_app.tsx",
      "parent": "/(app)",
      "children": [
        "/(app)/_app/explore",
        "/(app)/_app/"
      ]
    },
    "/(app)/_app/explore": {
      "filePath": "(app)/_app.explore.tsx",
      "parent": "/(app)/_app"
    },
    "/(app)/_app/": {
      "filePath": "(app)/_app.index.tsx",
      "parent": "/(app)/_app"
    }
  }
}
ROUTE_MANIFEST_END */
