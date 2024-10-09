export const secrets = {
  tursoUrl: new sst.Secret("TURSO_URL"),
  tursoAuthToken: new sst.Secret("TURSO_AUTH_TOKEN"),
};

export const allSecrets = Object.values(secrets);
