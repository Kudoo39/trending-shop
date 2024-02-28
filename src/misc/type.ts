export type Sort = 'Default' | 'Highest Price' | 'Lowest Price'

export type Category = {
  id: number
  name: string
  image: string
}

export interface CreateProductType {
  title: string
  price: number | null
  description: string
  categoryId: number
  images: string[]
}

export interface UpdateProductType {
  title?: string
  price?: number
  description?: string
  images?: string[]
}

export type ProductType = {
  id: number
  title: string
  price: number
  description: string
  category: Category
  images: string[]
}

export type CartType = ProductType & {
  quantity: number
}

export type UpdateQuantity = {
  id: number
  quantity: number
}

export interface UserCredential {
  email: string
  password: string
}

export type UserRegister = UserCredential & {
  name: string
  avatar: string
}

export type User = UserRegister & {
  role: 'customer' | 'admin'
  id: number
}
