import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Tag,
  Avatar,
  Popover,
  AutoComplete,
} from "antd";
import ReactHtmlParser from "react-html-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import FormEditProject from "../../../../Components/Form/FormEditProject/FormEditProject";
import { Popconfirm, message } from "antd";
import { NavLink } from "react-router-dom";

export default function ProjectManagement(props) {
  const projectList = useSelector(
    (state) => state.ProjectCyberbugsReducer.projectList
  );

  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );

  const [value, setValue] = useState(" ");
  const searchRef = useRef(null);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  useEffect(() => {
    dispatch({ type: "GET_LIST_PROJECT_SAGA" });
    // searchRef.current = setTimeout(() => {
    //   dispatch({ type: "GET_USER_API", keyWord: value });
    // }, 300);
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };
  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
      },
    },
    {
      title: "category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "creator",
      // dataIndex: "creatorName",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
    },
    {
      title: "members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title="members"
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Avatar</th>
                            <th>name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    width="30"
                                    height="30"
                                    style={{ borderRadius: "15px" }}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    className="btn-sm btn-danger"
                                    onClick={() => {
                                      dispatch({
                                        type: "REMOVE_USER_PROJECT_API",
                                        userProject: {
                                          projectId: record.id,
                                          userId: item.userId,
                                        },
                                      });
                                    }}
                                  >
                                    <DeleteOutlined />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="bottomLeft"
              title={"Add user"}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId,
                      };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({ type: "GET_USER_API", keyWord: value });
                      }, 300);
                    }}
                    onSelect={(valueSelect, option) => {
                      setValue(option.label);
                      dispatch({
                        type: "ADD_USER_PROJECT_API",
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    style={{ width: "100%" }}
                  ></AutoComplete>
                );
              }}
              trigger="click"
            >
              <Button>+</Button>
            </Popover>
          </div>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                dispatch({
                  type: "OPEN_FORM_EDIT_PROJECT",
                  title: "Edit Project",
                  Component: <FormEditProject></FormEditProject>,
                });
                dispatch({
                  type: "EDIT_PROJECT",
                  projectEditModal: record,
                });
              }}
            >
              <EditOutlined />
            </Button>
          </a>

          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({
                type: "DELETE_PROJECT_SAGA",
                idProject: record.id,
              });
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger size="small">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="container mt-5 col pl-5">
      <div>
        <h3>Project Management</h3>
      </div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
