import {createClient, type ClientConfig} from "@sanity/client";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || "2026-04-18";
const token = import.meta.env.SANITY_READ_TOKEN;

export const isSanityConfigured = Boolean(projectId && dataset);

let clientConfig: ClientConfig | null = null;

if (isSanityConfigured) {
  clientConfig = {
    projectId,
    dataset,
    apiVersion,
    useCdn: !token,
    perspective: "published",
    token,
  };
}

export const sanityClient = clientConfig ? createClient(clientConfig) : null;
