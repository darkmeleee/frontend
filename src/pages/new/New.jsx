import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';


const New = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({name: "",type: "",price: "", description:""});

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

    const amogus = new FormData();
    let sesc = "";
    amogus.append("files", file);


    axios.post("http://localhost:3000/upload_files", amogus, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then((response) => {
        sesc = response.data.link
        console.log(sesc);
       })


   setTimeout(
    function () { axios({
        method: 'post',
        url: 'http://80.90.186.129:3000/api/dish/create',
        headers: {},
        data: {
          "price": parseInt(formData.price),
          "type": typik,
          "description": formData.description,
          "name": formData.name,
          "imageUrl": sesc
        }
      });
      navigate('/products'); 
    }, 500);

    
    
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
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                  <input id="name" name="name" type="text" placeholder="Яблочный пирог" value={formData.name} onChange={handleChange}/>
                  
                </div>
                <div className="formInput" key={2}>
                  <label>Описание</label>
                  <input id="description" name="description" type="text" placeholder="Наивкуснейший пирог в мире." value={formData.description} onChange={handleChange}/>
                  
                </div>
                <div className="formInput" key={3}>
                  <label>Цена</label>
                  <input id="price" name="price" type="text" placeholder="100" value={formData.price} onChange={handleChange}/>
                  
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
