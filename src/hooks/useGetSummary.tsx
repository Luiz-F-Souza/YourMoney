import { useContext } from "react"
import { TransactionContext } from "../contexts/TransactionsContext"


export const useGetSummary = () => {

  const {transactions} = useContext(TransactionContext)

  const summary = transactions.reduce(
    (acc, transaction) => {

      if(transaction.type === 'income') acc.income = acc.income + transaction.price
      else acc.outcome = acc.outcome + transaction.price

      acc.total = acc.income - acc.outcome
      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0
    })

    return summary
}