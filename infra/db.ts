export const d1 = new sst.cloudflare.D1("D1");

export const database = new sst.Linkable("Database", {
  properties: {
    id: d1.id,
    accountId: d1.nodes.database.accountId,
  },
});

export const d1Token = new sst.Secret("D1_TOKEN");
