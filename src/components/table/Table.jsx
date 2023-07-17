import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import React from "react";



const List = () => {

  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://80.90.186.129:3000/api/order/getActive").then((response) => {
      setPost(response.data);
    });
  }, []);

  const amogus = [{
    
      id: "нет",
      createdAt: "нет заказов",
      price: "нет",
      pickup: "нет",
      status: "нет заказов"
    
  }]

  if (!post) return (
    <p>нет заказов</p>
  );
  console.log(post[0].id);

  
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
};



export default List;

