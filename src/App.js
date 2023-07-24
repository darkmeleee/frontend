import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import Single2 from "./pages/single2/Single2"
import New from "./pages/new/New";
import Edit from "./pages/editProducts/Edit"
import List2 from "./pages/list2/List2";
import List3 from "./pages/list3/List3"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              
            </Route>
            <Route path="products">
              <Route index element={<List2 />} />
              <Route path=":productId" element={<Single2 />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Добавить новое блюдо" />}
              />
              <Route
                path=":productId/edit"
                element={<Edit inputs={productInputs} title="Редактировать блюдо" />}
              />
              
                

            </Route>

            <Route path="orders">
              <Route index element={<List3 />} />


              
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
