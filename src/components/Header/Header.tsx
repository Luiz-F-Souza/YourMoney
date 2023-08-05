import {
  HeaderContainer,
  HeaderContent,
  LogoContainer,
  NewTransactionButton,
} from "./HeaderStyles";
import * as Dialog from "@radix-ui/react-dialog";
import Logo from "../../assets/logo.svg";
import { NewTransactionModal } from "../NewTransactionModal/NewTransactionModal";

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <img src={Logo} alt="" />
          <p>YourMoney</p>
        </LogoContainer>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};
