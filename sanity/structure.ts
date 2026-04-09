import {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Orders')
        .child(
          S.documentList()
            .title('All Orders')
            .schemaType('order')
            .filter('_type == "order"')
            .defaultOrdering([{field: 'orderedAt', direction: 'desc'}])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['order'].includes(listItem.getId() as string)
      ),
    ])
