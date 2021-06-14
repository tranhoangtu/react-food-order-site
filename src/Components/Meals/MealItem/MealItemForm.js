import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styled from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const amount = amountInputRef.current.value;
    const amountNumber = +amount;

    if (amount.trim().length === 0 || amountNumber < 1 || amountNumber > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(+amount);
  };

  return (
    <form onSubmit={submitHandler} className={styled.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please input a valid amount.</p>}
    </form>
  );
};

export default MealItemForm;
