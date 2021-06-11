import React, { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import styled from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styled.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={styled["main-image"]}>
        <img src={mealsImage} alt="" />
      </div>
    </Fragment>
  );
};

export default Header;
