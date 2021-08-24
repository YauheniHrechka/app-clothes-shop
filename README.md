# App clothes shop

This app gets data from the GraphQL endpoint and to provide an interface to view and interact with this data.

## State configuration

```
{
    cart: {
        products: new Map(),
        currency: '',
        totalCount: 0,
        totalAmount: 0
    },
    categories: {
        categories: [],
        products: new Map(),
        visitedProducts: new Map(),
        filters: {
            category: ''
        }
    },
    currencies: {
        currencies: []
    }
}
```

## Start project

```
npm run start
```