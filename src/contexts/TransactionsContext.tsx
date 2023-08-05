import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { AxiosResponse } from 'axios'


type TransactionsSchema = {
  id: number
  description: string,
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateTransactionSchema {
  description: string,
  type: 'income' | 'outcome'
  category: string
  price: number
}

interface TransactionContextSchema {
  transactions: TransactionsSchema[],
  getTransactions: (query?: string) => Promise<void>,
  createTransaction: (data: CreateTransactionSchema) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextSchema)


interface TransactionsProviderProps {
  children:  ReactNode
}

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({children}) => {

  
  const [ transactions, setTransactions ] = useState<TransactionsSchema[]>([])
  
  const getTransactions = async (query?: string) => {

    const response = await api.get('transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc'
      }
    })
  
    setTransactions(response.data)
  }

  const createTransaction = async (data: CreateTransactionSchema) => {
    const {category, description, price, type} = data
    try{
      const response: AxiosResponse<TransactionsSchema> = await api.post('transactions',{
        category,
        description, 
        price, 
        type,
        createdAt: new Date()
      })
      setTransactions( prev => [...prev, response.data ])
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getTransactions()
  },[])

  
  return(
    <TransactionContext.Provider value={{transactions, getTransactions: getTransactions, createTransaction: createTransaction}}>
      {children}
    </TransactionContext.Provider>
  )
}