import styled from "styled-components";
const
redOne = state => {
  return ({
    "--color": state.name ? "green" : "purple",
  });
},
redTwo = state => ({
  "--color": state.invalid ? "var(--color-error)" :
    state.valid ? "var(--color-success)" : "transparent",
  "--pointer": !state.focused && "pointer",
});

const
FieldOne = styled.div`
label {
color: var(--color)
}
`,
FieldTwo = styled.div`
font-size: var(--font-root-regular);
box-sizing: border-box;
display: flex;
flex-flow: row wrap;
justify-content: space-between;
align-items: center;
position: relative;

label {
text-transform: capitalize;
font-weight: bold;
color: var(--color-font);
flex: 1 1 50%;
}
label::after {
content: " :";
}
input {
flex: 1 1 50%;
display: inline-block;
outline: none;
box-shadow: none;
border: 3px solid var(--color);
cursor: var(--pointer);
height: 30px;
min-width: 100px;
padding: 5px 5px;
border-radius: 10px;
text-align: center;
padding-right: ${props => props.password && "40px"};

}
input:disabled {
background-color: transparent;
opacity: 1;
font-weight: bold;
text-transform: capitalize;
color: var(--color-font);
border: none;
}
.error {
box-sizincg: border-box;
flex: 1 1 100%;
padding: 10px 0;
min-height: 40px;
display: flex;
justify-content: flex-end;
color: var(--color);
}

.password {
position: absolute;
width: 30px;
height: 30px;
top: 0;
right: 8px;
cursor: pointer;
}

@media (min-width: 1100px) {
font-size: var(--font-root-large);


input {
height: 40px;
font-size: var(--font-size-regular);
}

.password {
top: 5px;
}
}
`;

const
Fields = [
  FieldOne,
  FieldTwo,
],
Reducers = [
  redOne,
  redTwo,
],
Pairs = [
  [FieldOne, redOne],
  [FieldTwo, redTwo]
];

export default function composeField(variant) {
  if (!variant) return Pairs[0];
  if (variant instanceof Array) return variant;
  if (typeof variant === "number") return Pairs[variant];
  let { Field, reducer } = variant;
  Field = Fields[Field || 0];
  reducer = Reducers[reducer || 0];
  return [Field, reducer];
}
