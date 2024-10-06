export const d1 = new sst.cloudflare.D1("D1Database");

export const database = new sst.Linkable("D1Properties", {
  properties: {
    id: d1.id,
    accountId: d1.nodes.database.accountId,
  },
});
