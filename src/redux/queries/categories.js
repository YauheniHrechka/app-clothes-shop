import { Query, Field } from '@tilework/opus';

export const GET_ALL_CATEGORIES = new Query('categories', true)
    .addFieldList(['name'])

export const GET_PRODUCTS_BY_CATEGORY = category => new Query('category')
    .addArgument('input', 'CategoryInput', { 'title': category })
    .addField(new Field('products', true)
        .addFieldList(['id', 'name', 'inStock', 'gallery'])
        .addField(new Field('prices', true)
            .addFieldList(['currency', 'amount'])
        )
    )