/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,  faTrashAlt, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import { Row, Alert } from "reactstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { getAuth } from "firebase/auth";

import Alerta from "../Alerta";
const { SearchBar } = Search;
const BASE_URL = process.env.REACT_APP_API_URL;
const PATH_USERS = 'users';

export default function UsersTable() {
  const [users, setUsers] = useState( []); // transformers users
  const key =  users.map(el => el._id);

  const auth = getAuth();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState(null);
  const [newVal, setNewVal] = useState(0);
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    verifyUsers (user.email);
  }, [user, loading, history]);

 


  const verifyUsers = (email) => {
    if (!user) return history.replace("/");
    else{
    user.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      
      fetch(`${BASE_URL}${PATH_USERS}/email/${email}`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
           
            if(result.length === 0)
            createUser();
            retrieveUsers ();
             
          },
          (error) => {
            
            console.error(error);
          }
        )
    });}
    };
    const createUser = () => {
      if (!user) return history.replace("/");
        console.log(user)
      const save ={user:user.displayName, email:user.email, stateUser:"no autorizado", rol:"vendedor" }
      user.getIdToken(true).then(token => {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(save)
        };
        fetch(`${BASE_URL}${PATH_USERS}`, requestOptions)
          .then(
            (response) => {
              response.json();
              retrieveUsers();
            },
            (error) => {
              
            })
      });
      };

  const retrieveUsers = () => {
    if (!user) return history.replace("/");
    user.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${BASE_URL}${PATH_USERS}`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            console.log("Usuarios cargados desde la base de datos");
            console.log(result);
            setUsers(result); 
          },
          (error) => {
            setIsLoaded(true);
            setErrors(error);
          }
        )
    });
    };
  // To delete rows you be able to select rows
  const [state, setState] = useState({
    row: null,
    state: null,
    oldValue: null
  });
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseAlert = () => setShowAlert(false);
  const [mensaje, setMensaje] = useState("") 
  const [title, setTitle] = useState("") 
  const [variant, setVariant] = useState("") 
  

  // hide checkbox for selection
  const selectRowProp = {
    mode: "checkbox",
    hideSelectColumn: true
  };

  // validator for number fields
  
  const stateValidator = (newValue, row, column) => {
    if (newValue.toLowerCase()!=="autorizado" && newValue.toLowerCase()!=="no autorizado" && newValue.toLowerCase()!=="pendiente") {
      return {
        valid: false,
        message: "Estado incorrecto debe escoger entre pendiente, autorizado y no autarizado"
      };
    }
    return true;
  };
  const rolValidator = (newValue, row, column) => {
    if (newValue.toLowerCase()!=="administrador" && newValue.toLowerCase()!=="vendedor") {
      return {
        valid: false,
        message: "Estado incorrecto debe escoger entre administrador y vendedor"
      };
    }
    return true;
  };

  const columns = [
    { dataField: "_id",
    text: "#",
    sort: true,
    editable: function(rowData) {
      return rowData.allowEdit === false;
    },
    formatter: (cellContent, row, rowIndex) => {
      
      return(
        <strong>{rowIndex+1}</strong>
      );
      
      }    
    },
  
    {
      dataField: "user",
      text: "Usuario",
      sort: true,
      editable: function(rowData) {
        return rowData.allowEdit === false;
      },
      formatter: (cellContent, row) => {
        return(
          <div>
          <div className="title-th" data-title="Usuario: "></div>{row.user}
          </div>
        );
      }
    },
    {
      dataField: "email",
      text: "Correo",
      sort: true,
      editable: function(rowData) {
        return rowData.allowEdit === false;
      },
      formatter: (cellContent, row) => {
        return(
          <div>
          <div className="title-th" data-title="Correo: "></div>{row.email}</div>
        );
      }
    },
    {
      dataField: "stateUser",
      text: "Estado",
      sort: true,
      validator: stateValidator,
      formatExtraData: state,

      formatter: (cellContent, row) => {
        if(row.stateUser.toLowerCase()==="autorizado")
        return(
          <div>
          <div className="title-th" data-title="Estado: "></div><span className="status-p bg-success text-white">Autorizado</span>
        </div>);
      
      else if(row.stateUser.toLowerCase()==="no autorizado")
        return(
          <div>
          <div className="title-th" data-title="Estado: "></div><span className="status-p bg-danger text-white">No Autorizado</span>
        </div>);
        else if(row.stateUser.toLowerCase()==="pendiente")
        return(
          <div>
          <div className="title-th" data-title="Estado: "> </div><span className="status-p bg-warning text-white">Pendiente</span>
        </div>)
            
        }
    },
    {
      dataField: "rol",
      text: "Rol",
      validator: rolValidator,
      sort: true,
      formatter: (cellContent, row) => {
        if(row.rol.toLowerCase()==="administrador")
        return(
          <div>
          <div className="title-th" data-title="Rol: "></div><span className="status-p bg-success text-white">Administrador</span>
        </div>);
      
      else if(row.rol.toLowerCase()==="vendedor")
        return(
          <div>
          <div  className="title-th" data-title="Rol: "></div><span className="status-p bg-primary text-white">Vendedor</span>
        </div>)
            
        }
    },
    {
      dataField: "state",
      text: "State",
      isDummyField: true,

      hidden: true
    },
    {
      dataField: "actions",
      text: "Acciones",
      editable: false,
      isDummyField: true,
      formatExtraData: state,

      formatter: (cellContent, row,rowIndex) => {
       

        if (row.state)
          return (
            <div className="action">
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  
                    
                  setState(prev => {
                    
                    
                    row.state = null;
                    
                    let newState = { ...prev, state: row.state, row: null };
                   
                    const save={ stateUser:row.stateUser, rol:row.rol}
                    console.log(row._id + save)
                    handleEdit(row._id, save);

                    setTitle("El usuario: "+row.user)
                    setMensaje("Fue actualizado correctamente.")
                    setVariant("success")
                    setShowAlert(true);


                    //alert("Usuario actualizado correctamente.");
                    return newState;
                  });
                }}
              ><FontAwesomeIcon icon={faSave} />
                
              </button>
              <button
                className="btn btn-danger btn-xs box" 
                onClick={() => {
                  setUsers(prev => {
                    let newVal = prev.map(el => {
                      if (el.id === row._id) {
                        return state.oldValue;
                      }
                      return el;
                    });
                    return newVal;
                  });
                  setState(prev => {
                    row.state = null;
                    let newState = { ...prev, state: row.state, row: null };
                    return newState;
                  });
                }}
              >
                <FontAwesomeIcon icon={faWindowClose} />
                
              </button>
            </div>
          );
        else
          return (
            <div className="action">
              <button
                className="btn btn-danger btn-xs"
                onClick={() => handleDelete(row._id,rowIndex)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                
              </button>
            </div>
          );
      }
    }
  ];

  const defaultSorted = [
    {
      dataField: "user",
      order: "asc"
    }
  ];

  // a function to save the old value
  const handleStartEdit = row => {
    setState(prev => {
      let newVal = { ...prev, oldValue: { ...row } };
       return newVal;
    });
  };
    //edit
const handleEdit =(id, data) => {  
    user.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      };
      fetch(`${BASE_URL}${PATH_USERS}/${id}`, requestOptions)
        .then(result => result.json())
        .then(
          (result) => {
            setNewVal(newVal + 1);
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    });
 
       };

  //  delected the selected row
  const handleDelete = rowId => {
    user.getIdToken(true).then(token => {
        const requestOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        fetch(`${BASE_URL}${PATH_USERS}/${rowId}`, requestOptions)
          .then(result => result.json())
          .then(
            (result) => {
              retrieveUsers ();
            },
            (error) => {
              console.log(error);
            }
          );
      });
  };

  if (errors) {
    return <Alert color="danger">
      Error: {error.message}
    </Alert>;
  } else {
  return (
    <>
    <Row >
    <Alerta
        show={showAlert}
        onCancel={handleCloseAlert}
        mensaje={mensaje}
        variant={variant}
        head={title}
    />
      
      </Row>
<Row >
  
  <ToolkitProvider 
  keyField="_id"
  data={ users }
  columns={ columns }
  search
>
  {
    props => (
      <div>
        <SearchBar { ...props.searchProps } />
        <hr />
        <div className="Card">
        <BootstrapTable
          { ...props.baseProps }
          
          selectRow={selectRowProp}
          
          defaultSorted={defaultSorted}
          pagination={paginationFactory()}
          cellEdit={cellEditFactory({
            mode: "dbclick",
            blurToSave: true,
            onStartEdit: (row, column, rowIndex, columnIndex) => {
              console.log("start to edit!!!");
              if (row.state !== "edited") {
                console.log(row.state);
                handleStartEdit(row);
              }
            },
            beforeSaveCell: (oldValue, newValue, row, column) => {
              console.log("Before Saving Cell!!");
            },
            afterSaveCell: (oldValue, newValue, row, column) => {
              console.log("After Saving Cell!!");
              if (oldValue !== newValue) {
                row.state = "edited";
                setState({ ...state, row: row, state: row.state });
              }
            },
            nonEditableRows: () =>
              state.row ? key.filter(el => el !== state.row._id) : []
              
          })}



        />
      </div></div>
    )
  }
</ToolkitProvider>



</Row>
<Row></Row>





     
     
    </>
  );
}
}
