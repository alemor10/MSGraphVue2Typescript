/* eslint @typescript-eslint/no-var-requires: "off" */

//https://www.npmjs.com/package/@microsoft/microsoft-graph-client



import { GraphMessages, GraphUserDetails } from "./graphTypes";
const graph = require("@microsoft/microsoft-graph-client");


//initalizes client
const getAuthenticatedClient = (accessToken: string) => {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done: any) => {
      done(null, accessToken);
    }
  });

  return client;
};


// this function can be take in access coin and can query any part of the MS Graph
// https://developer.microsoft.com/en-us/graph/graph-explorer
export const getUserDetails = (
  accessToken: string
): Promise<GraphUserDetails> => {
  const client = getAuthenticatedClient(accessToken);

  return Promise.resolve(client.api("/me").get());
};

export const getMessages = (accessToken: string): Promise<GraphMessages> => {
  const client = getAuthenticatedClient(accessToken);

  return Promise.resolve(client.api("/me/messages").get());
};