import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./SearchFormStyles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "../../../../contexts/TransactionsContext";
import { useContext } from "react";

const zodSchema = z.object({
  query: z.string(),
});

type FormSchema = z.infer<typeof zodSchema>;

export const SearchForm = () => {
  const {getTransactions} = useContext(TransactionContext);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit = handleSubmit((data) => {
    getTransactions(data.query)
  });

  return (
    <SearchFormContainer onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <span>Buscar</span>
        <MagnifyingGlass size={20} />
      </button>
    </SearchFormContainer>
  );
};
