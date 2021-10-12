import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,  faTrashAlt, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import { Row, } from "reactstrap";
import UserDataService from "../../services/user"

import Alerta from "../Alerta";

const { SearchBar } = Search;

export default function UsersTable() {
  
  const [users, setUsers] = useState( []); // transformers users
  const key =  users.map(el => el._id);
  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserDataService.getAll()
    .then(response => {
      setUsers(response.data);     
    })
    .catch(e => {
      console.log(e);
  });};
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
          <div className="status-p bg-success text-white">Autorizado</div>
        );
      
      else if(row.stateUser.toLowerCase()==="no autorizado")
        return(
          <span className="status-p bg-danger text-white">No Autorizado</span>
        );
        else if(row.stateUser.toLowerCase()==="pendiente")
        return(
          <span className="status-p bg-warning text-white">Pendiente</span>
        )
            
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
          <div className="status-p bg-success text-white">Administrador</div>
        );
      
      else if(row.rol.toLowerCase()==="vendedor")
        return(
          <span className="status-p bg-primary text-white">Vendedor</span>
        )
            
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
      text: "Actiones",
      editable: false,
      isDummyField: true,
      formatExtraData: state,

      formatter: (cellContent, row,rowIndex) => {
       

        if (row.state)
          return (
            <div>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  
                    
                  setState(prev => {
                    
                    
                    row.state = null;
                    
                    let newState = { ...prev, state: row.state, row: null };
                   
                    const save={user:row.user, stateUser:row.stateUser, rol:row.rol}
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
            <div>
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
  UserDataService.updateUser(id,data)
         .then(response => {
           console.log(response.data);
         })
         .catch(e => {
           console.log(e);
         });
       };

  //  delected the selected row
  const handleDelete = rowId => {
    UserDataService.deleteUser( rowId)
       .then(response => {
        retrieveUsers();
       })
       .catch(e => {
          console.log(e);
       });
   };

      
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
