import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/lib/types'
import { getBranchProducts } from '@/lib/mock-data'
import { useEffect } from 'react'

interface ProductsStore {
  productsByBranch: { [branchId: string]: Product[] }
  addProduct: (branchId: string, product: Product) => void
  updateProduct: (branchId: string, product: Product) => void
  deleteProduct: (branchId: string, productId: string) => void
  setProducts: (branchId: string, products: Product[]) => void
  getProducts: (branchId: string) => Product[]
  getAllProducts: () => Product[]
}

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set, get) => ({
      productsByBranch: {},
      addProduct: (branchId, product) => {
        set(state => ({
          productsByBranch: {
            ...state.productsByBranch,
            [branchId]: [product, ...(state.productsByBranch[branchId] || [])]
          }
        }))
      },
      updateProduct: (branchId, product) => {
        set(state => ({
          productsByBranch: {
            ...state.productsByBranch,
            [branchId]: (state.productsByBranch[branchId] || []).map(p =>
              p.id === product.id ? { ...p, ...product } : p
            )
          }
        }))
      },
      deleteProduct: (branchId, productId) => {
        set(state => ({
          productsByBranch: {
            ...state.productsByBranch,
            [branchId]: (state.productsByBranch[branchId] || []).filter(p => p.id !== productId)
          }
        }))
      },
      setProducts: (branchId, products) => {
        set(state => ({
          productsByBranch: {
            ...state.productsByBranch,
            [branchId]: products
          }
        }))
      },
      getProducts: (branchId) => {
        const branchProducts = get().productsByBranch[branchId]
        if (!branchProducts || branchProducts.length === 0) {
          return getBranchProducts(branchId)
        }
        return branchProducts
      },
      getAllProducts: () => {
        const all = Object.values(get().productsByBranch).flat()
        if (!all || all.length === 0) {
          return [
            ...getBranchProducts('jaffna'),
            ...getBranchProducts('colombo')
          ]
        }
        return all
      }
    }),
    {
      name: 'products-storage',
      onRehydrateStorage: () => (state) => {
        // After hydration, check if all branches are empty or missing
        const pb = state?.productsByBranch || {}
        const isEmpty = !pb['jaffna']?.length && !pb['colombo']?.length
        if (isEmpty) {
          // Re-initialize from mock data
          state.productsByBranch = {
            jaffna: getBranchProducts('jaffna'),
            colombo: getBranchProducts('colombo')
          }
        }
      }
    }
  )
) 