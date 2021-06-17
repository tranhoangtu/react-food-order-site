import { useRef, useState } from "react";
import styled from "./CheckOut.module.css";

const isEmpty = (value) => value.trim().length === 0;
const isFiveChar = (value) => value.trim().length === 5;

const CheckOut = (props) => {
  const [formIsValidity, setFormIsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChar(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormIsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
  };
  return (
    <form onSubmit={confirmHandler}>
      <div
        className={`${styled.control} ${
          !formIsValidity.name ? styled.invalid : null
        }`}
      >
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formIsValidity.name && <p>Please input a valid name!</p>}
      </div>
      <div
        className={`${styled.control} ${
          !formIsValidity.street ? styled.invalid : null
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formIsValidity.street && <p>Please input a valid street!</p>}
      </div>
      <div
        className={`${styled.control} ${
          !formIsValidity.postal ? styled.invalid : null
        }`}
      >
        <label htmlFor="postal">Postal code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formIsValidity.postal && <p>Please input a valid postal code!</p>}
      </div>
      <div
        className={`${styled.control} ${
          !formIsValidity.city ? styled.invalid : null
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formIsValidity.city && <p>Please input a valid city!</p>}
      </div>
      <div className={styled.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styled.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
