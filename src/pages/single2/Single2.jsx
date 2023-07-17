import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";



const Single2 = () => {
  let { productId } = useParams();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get(`http://80.90.186.129:3000/api/dish/get?id=${productId}`).then((response) => {
      setData(response.data);
    });
  }, []);

  if(!data) return null;

  /*function List()  {
    let { userId } = useParams();
    const [post, setPost] = React.useState(null);
  
    React.useEffect(() => {
      axios.get(`http://localhost:3000/api/order/getUserOrders?id=${userId}`).then((response) => {
        setPost(response.data);
      });
    }, []);
  
    if (!post) return null;
  
    
    return (
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
  
              
              <TableCell className="tableCell">Дата</TableCell>
              <TableCell className="tableCell">Цена</TableCell>
              <TableCell className="tableCell">Способ оплаты</TableCell>
              <TableCell className="tableCell">Состояние</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {post.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="tableCell">{post.id}</TableCell>
             
               
                <TableCell className="tableCell">{post.createdAt}</TableCell>
                <TableCell className="tableCell">{post.price}</TableCell>
                <TableCell className="tableCell">{post.pickup}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${post.status}`}>{post.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  */


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Изменить</div>
            <h1 className="title">Информация</h1>
            <div className="item">
              <div className="details">
              <img className="itemImg" src={ data.imageUrl }></img>
                <h1 className="itemTitle">{ data.name }</h1>
                
                <div className="detailItem">
                  <span className="itemKey">Описание: </span>
                  <span className="itemValue">{ data.description } </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Цена: </span>
                  <span className="itemValue">{ data.price }₽</span>
                </div>
                
               
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single2;
