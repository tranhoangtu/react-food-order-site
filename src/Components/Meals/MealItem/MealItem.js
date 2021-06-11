import styled from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={styled.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styled.description}>{props.description}</div>
        <div className={styled.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
