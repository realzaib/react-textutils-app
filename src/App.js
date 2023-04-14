import "./App.css";
import Alert from "./componets/Alert";
import About from "./componets/About";
import Navbar from "./componets/Navbar";
import TextForm from "./componets/Textform";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  // console.log(Switch)
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  console.log(About)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.background = "black";
      document.body.style.color = "white";
      showAlert("Dark mode has been enabled!", "success");
    } else {
      setMode("light");
      document.body.style.background = "white";
      document.body.style.color = "black";
      showAlert("Light mode has been enabled!", "success");
    }
  };
  return (
    <>
      <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className={`container my-5`}>
          <Routes>
            <Route path="/" exact element={<TextForm showAlert={showAlert} heading="Enter the text to anlyize" mode={mode}/>} />
            {/* <Route path="a" element={<>check</>} /> */}
            <Route path="/about" exact element={<About/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;