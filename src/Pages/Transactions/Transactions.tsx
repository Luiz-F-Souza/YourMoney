import { useContext } from "react";
import { Header } from "../../components/Header/Header";
import { Summary } from "../../components/Summary/Summary";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./TransactionsStyle";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formmater";




export const Transactions = () => {
 
  const {transactions} = useContext(TransactionContext)

  

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map( transaction => {
              const {category, createdAt, description, id, price, type} = transaction
              const formattedPrice = priceFormatter.format(price)
              const date = dateFormatter.format(new Date(createdAt))
              return(
                <tr key={id}>
                <td width="50%">{description}</td>
                <td><PriceHighlight variant={type}>{formattedPrice}</PriceHighlight></td>
                <td>{category}</td>
                <td>{date}</td>
              </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};
