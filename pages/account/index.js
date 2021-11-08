import {Header, Account} from "components/Account";
import {StandardLayout, NoLayout} from "components/APP";
import {Field} from "components/Fields";
import styled from "styled-components";

export default function ACCOUNT_INDEX_PAGE() {
  const ss = styled.div`
label {
color: yellow;
}
`;
  return (
    <NoLayout><Account/></NoLayout>
  );
}
