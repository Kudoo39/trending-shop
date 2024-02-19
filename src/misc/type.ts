export type Category = 'All' | 'electronics' | 'jewelery' | 'men\u0027s clothing' | 'women\u0027s clothing'

export type Sort = 'Original' | 'Highest Price' | 'Lowest Price'

export type ProductType = {
  id: number
  title: string
  price: number
  description: string
  category: Category
  image: string
}

export type CartType = {
  product: ProductType
  quantity?: number
}
