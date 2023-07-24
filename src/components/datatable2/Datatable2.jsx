import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns} from "../../datatablesource2";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";



const Datatable2 = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://80.90.186.129:3000/api/dish/getAll").then((response) => {
      setData(response.data);
    });
  }, []);

  if(!data) return null;

  const handleDelete = (id) => {
    

    console.log('amongus');
    axios({
      method: 'post',
      url: 'http://80.90.186.129:3000/api/dish/delete',
      headers: {},
      data: {
        "id": id
      }
    });
    console.log('amongus');
    setData(data.filter((item) => item.id !== id));
      
    

    
  
    
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Действие",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={''+params.row.id+"/edit"} style={{ textDecoration: "none" }}>
              <div className="viewButton">Изменить</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Удалить
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Блюда
        <Link to="/products/new" className="link">
          Добавить
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable2;
