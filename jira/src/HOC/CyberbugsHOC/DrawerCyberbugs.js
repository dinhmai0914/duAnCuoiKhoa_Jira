import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Footer } from "antd/lib/layout/layout";

export default function DrawerCyberbugs(props) {
  const { visible, ComponentContnetDrawer, callBackSubmit, title } =
    useSelector((state) => state.drawerReducer);

  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch({ type: "OPEN_DRAWER" });
  };

  const onClose = () => {
    dispatch({ type: "CLOSE_DRAWER" });
  };

  return (
    <>
      {/* <button onClick={showDrawer}>Click</button> */}
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={callBackSubmit} type="primary">
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        {ComponentContnetDrawer}
      </Drawer>
    </>
  );
}
