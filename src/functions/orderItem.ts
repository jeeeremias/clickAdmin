import { OrderItem } from '../typings'

export const calculateItemPrice = (
  item: Omit<OrderItem, 'itemPrice'>
): number => {
  const productPrices = item.product.price

  const itemsPrice = item.selectedItems.reduce((acc, cur) => {
    const assembly = item.product.assemblyOptions?.find(
      (_assembly) => _assembly.name === cur.name
    )

    if (!assembly) {
      console.error(`Couldn't find an Assembly ${cur.name}`)
    }

    const optionsPriceMap =
      assembly?.options?.reduce((_acc, _cur) => {
        return Object.assign(_acc, {
          [_cur.name]: _cur.price ?? 0,
        })
      }, {} as Record<string, number>) ?? {}

    const subItemsPrice = cur.options.reduce((__acc, __cur) => {
      const itemPrice = optionsPriceMap[__cur.name] ?? 0

      return itemPrice * __cur.quantity + __acc
    }, 0)

    const assemblyOptionIncrement = cur.options.some(
      ({ quantity }) => quantity > 0
    )
      ? assembly?.price ?? 0
      : 0

    return assemblyOptionIncrement + subItemsPrice + acc
  }, 0)

  return (productPrices + itemsPrice) * item.quantity
}

export const mapFormToAssembly = (
  assembly: Record<string, Record<string, string>>
): OrderItem['selectedItems'] => {
  const itemsNames = Object.keys(assembly)

  const getOptionsForItem = (options: Record<string, string>) => {
    const optionsNames = Object.keys(options)

    return optionsNames.map((optionName) => ({
      name: optionName,
      quantity: parseInt(options[optionName], 10),
    }))
  }

  return itemsNames.map((itemName) => ({
    name: itemName,
    options: getOptionsForItem(assembly[itemName]),
  }))
}
