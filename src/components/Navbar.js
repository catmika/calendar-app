import { Menu, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import React from "react";
import { RouteNames } from "../router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth, user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  return (
    <Header>
      <Row justify="end">
        {isAuth ? (
          <>
            <div style={{ color: "white" }}>{user.username}</div>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item
                onClick={() =>
                  dispatch(logout()).then(() => navigate("/login"))
                }
                key={1}
              >
                Logout
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item onClick={() => navigate(RouteNames.LOGIN)} key={2}>
              Login
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Header>
  );
};

export default Navbar;
