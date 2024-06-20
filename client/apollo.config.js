module.exports = {
  client: {
    incudes: ['./src/graphql/*.ts'],
    excludes: [],
    service: {
      url: import.meta.env.PHARMA_STOCK_API_URL
    },
  },
};
