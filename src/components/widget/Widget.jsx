import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from 'axios';
import React from "react";



const Widget = ({ type }) => {
  let data;


 

  const [post, setPost] = React.useState(null);
  const [ordercount, setordercount] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://localhost:3000/api/user/getAmount").then((response) => {
      setPost(response.data);
    });
    axios.get("http://localhost:3000/api/order/getAmount").then((response) => {
      setordercount(response.data);
    });
  }, []);

  if (!post) return null;
  if (!ordercount) return null;

  
  



 
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        type: "user",
        title: "Пользователи",
        isMoney: false,
        link: "Посмотреть всех пользователей",
        amount: post.count,
        path: "/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        type: "order",
        title: "Заказы",
        isMoney: false,
        link: "Посмотреть все заказы",
        amount: ordercount.count,
        path: "/orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <a href={data.path}><span className="link">{data.link}</span></a>
      </div>
     
    </div>
  );
};

export default Widget;
