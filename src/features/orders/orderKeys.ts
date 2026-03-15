const orderKeys = {
  all: ["orders"],
  details: (id: number) => ["order", "details", id],
} as const;

export default orderKeys;
