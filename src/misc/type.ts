export type Category = 'All' | 'electronics' | 'jewelery' | 'men\u0027s clothing' | 'women\u0027s clothing'

export type Sort = 'Default' | 'Highest Price' | 'Lowest Price'

export type ProductType = {
  id: number
  title: string
  price: number
  description: string
  category: Category
  image: string
}

export type CartType = ProductType & {
  quantity: number
}

export type UpdateQuantity = {
  id: number
  quantity: number
}

export type UserRegister = {
  name: string
  email: string
  password: string
  avatar: string
}

export type User = UserRegister & {
  role: 'customer' | 'admin'
  id: number
}
