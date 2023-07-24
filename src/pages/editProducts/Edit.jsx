import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import React from "react";
import {Routes, Route, useNavigate, useParams} from 'react-router-dom';



const New = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [data, setData] = React.useState(null);
  const [formData, setFormData] = useState({name: "", type: "",price: "", description: ""});
  let executed = 0;
  let { productId } = useParams();

  React.useEffect(() => {
    axios.get(`http://80.90.186.129:3000/api/dish/get?id=${productId}`).then((response) => {
      setData(response.data);
    
    });
  }, []);
  if(!data) return null;

  

 /*if(executed == 0){
    
     if(data.type == 2){
      formData.type = "cake";
     }
     else{
      formData.type = "pirog";
     }
    formData.name = data.name
    formData.price = data.price
    formData.description = data.description
    executed = 1;   
    */

 

  
  


  const handleSubmit = (event) => {
    event.preventDefault();
   // alert(`Name: ${formData.name}, description: ${formData.description}, Price: ${formData.price}, Type: ${formData.type}, File: ${URL.createObjectURL(file)}`)
    if(formData.name == "" || formData.description == "" || !formData.price || formData.type == "" || file == null){
      alert("не все данные были введены, проверьте правильность ввода")
    }
    else {
    let typik;
    if(formData.type == "cake"){
      typik = 2;
    }
    else{
      typik = 1;
    }
    axios({
      method: 'post',
      url: 'http://80.90.186.129:3000/api/dish/update',
      headers: {},
      data: {
        "id": parseInt(productId),
        "price": parseInt(formData.price),
        "type": typik,
        "description": formData.description,
        "name": formData.name,
       // "imageUrl": URL.createObjectURL(file)
      }
    });
    navigate('/products');
  }
    
    
};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const navigateToProducts = () => {
    // 👇️ navigate to /contacts
    navigate('/products');
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : data.imageUrl
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Изображение: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>
                Категория:
                  <select id="type" name="type" value={formData.type} onChange={handleChange}>
                    <option>Выберите:</option>
                    <option value="pirog">Пироги</option>
                    <option value="cake">Торты</option>
                  </select>
                  </label>
              </div>

            
                <div className="formInput" key={1}>
                  <label>Название</label>
                  <input id="name" name="name" type="text" placeholder={data.name} value={formData.name} onChange={handleChange}/>
                  
                </div>
                <div className="formInput" key={2}>
                  <label>Описание</label>
                  <input id="description" name="description" type="text" placeholder={data.description} value={formData.description} onChange={handleChange}/>
                  
                </div>
                <div className="formInput" key={3}>
                  <label>Цена</label>
                  <input id="price" name="price" type="text" placeholder={data.price} value={formData.price} onChange={handleChange}/>
                  
                </div>
              
              <button type="submit" >Создать</button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
