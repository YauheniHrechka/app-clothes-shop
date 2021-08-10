import { Query, Field } from '@tilework/opus';

export const GET_CATEGORIES = new Query('categories', true)
    .addFieldList(['name'])
    .addField(new Field('products', true)
        .addFieldList(['id', 'name', 'inStock', 'gallery', 'description', 'category', 'brand'])
        .addField(new Field('attributes', true)
            .addFieldList(['id', 'name', 'type'])
            .addField(new Field('items', true)
                .addFieldList(['id', 'value', 'displayValue'])
            )
        )
        .addField(new Field('prices', true)
            .addFieldList(['currency', 'amount'])
        )
    )