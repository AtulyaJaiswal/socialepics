import React, {Fragment, useEffect} from 'react';
import "./UserList.css";
import { DataGrid } from '@mui/x-data-grid';
import SideBar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";

const UserList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, users } = useSelector((state) => state.allUser);
    // console.log(users);
    const { loading:userLoading, isAuthenticated, user } = useSelector((state) => state.user);
    const { error:deleteError, isDeleted, message } = useSelector((state) => state.deleteUser);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    useEffect(() => {

      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }

      if (deleteError) {
        toast.error(deleteError);
        dispatch(clearErrors());
      }

      if (isDeleted) {
        toast.success(message);
        navigate("/admin/userList");
        dispatch({ type: DELETE_USER_RESET });
      }

      dispatch(getAllUsers());
    }, [dispatch, isDeleted, deleteError, error, message, navigate]);

    const columns = [
        { 
          field: "id", 
          headerName: "User ID", 
          minWidth: 200, 
          flex: 1,
        },
        {
          field: "email",
          headerName: "Email",
          minWidth: 120,
          flex: 1,
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 120,
          flex: 0.7,
        },
        {
          field: "userName",
          headerName: "User Name",
          minWidth: 120,
          flex: 0.7,
        },
        {
          field: "phone",
          headerName: "Phone Number",
          minWidth: 100,
          flex: 0.8,
        },
        {
          field: "role",
          headerName: "Role",
          type: "number",
          minWidth: 70,
          flex: 0.5,
          cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin"
              ? "greenColor"
              : "redColor";   
          },
        },
    
        {
          field: "actions",
          flex: 0.5,
          headerName: "Actions",
          minWidth: 70,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                {/* <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link> */}
    
                <Button
                  onClick={() =>
                    deleteUserHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
    
      const rows = [];
    
      users &&
        users.forEach((item) => {
          rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.getName,
            phone: item.phoneNumber,
            userName: item.userName,
          });
        });
    
      return (
        <Fragment>      
          <div className="dashboard">
            <SideBar />
            <div className="userListContainer">
              <h1 className="userListHeading">ALL USERS</h1>
    
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="userListTable"
                autoHeight
              />
            </div>
          </div>
        </Fragment>
      );
}

export default UserList;