export type Category = 'electronics' | 'jewelery' | 'men\u0027s clothing' | 'women\u0027s clothing'

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: Category
  images: string
}
