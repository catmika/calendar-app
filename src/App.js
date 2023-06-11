import React, { useEffect } from "react";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import Layout, { Content } from "antd/es/layout/layout";
import "./App.css";
import { useDispatch } from "react-redux";
import { setAuthAction, setUserAction } from "./store/reducers/auth";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      dispatch(setUserAction({ username: localStorage.getItem("username") }));
      dispatch(setAuthAction(true));
    }
  }, []);

  return (
    <Layout>
      <Navbar />
      <Content>
        <AppRouter />
      </Content>
    </Layout>
  );
};

export default App;
