/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,  faTrashAlt, faPlusCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from "reactstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { getAuth } from "firebase/auth";
import NewSale from "../Form/NewSaleform.jsx";
import Alerta from "../Alerta";
const { SearchBar } = Search;
const BASE_URL = process.env.REACT_APP_API_URL;
const PATH = 'sales';

export default function SalesTable() {
  
  const [sales, setSales] = useState([]); // transformers sales
  const key =  sales.map(el => el._id);
  const auth = getAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState(null);
  const [newVal, setNewVal] = useState(0);
  const [newDate, setNewDate] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);   
  const [show,setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleCloseAlert = () => setShowAlert(false);
  const [mensaje, setMensaje] = useState("");
  const [title, setTitle] = useState("");
  const [variant, setVariant] = useState("");
  // To delete rows you be able to select rows
  const [state, setState] = useState({
      row: null,
      state: null,
      oldValue: null
    });

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    else
    retrieveSales();
    
  }, [user, loading, history]);
    
  const retrieveSales = () => {
      if (!user) return history.replace("/");
      user.getIdToken(true).then(token => {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        fetch(`${BASE_URL}${PATH}`, requestOptions)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              console.log("Lista de ventas cargada desde la base de datos");
              console.log(result);
              setSales(result); 
            },
            (error) => {
              setIsLoaded(true);
              setErrors(error);
            }
          )
      });
  };
  
  // hide checkbox for selection
  const selectRowProp = {
    mode: "checkbox",
    hideSelectColumn: true
  };

  // validator for number fields
  const numberValidator = (newValue, row, column) => {
    if (isNaN(newValue)) {
      return {
        valid: false,
        message: "Este campo es numerico"
      };
    }
    return true;
  };
// validator for state fields
  
const stateValidator = (newValue, row, column) => {
  if (newValue.toLowerCase()!=="pendiente" && newValue.toLowerCase()!=="cancelado" && newValue.toLowerCase()!=="entregado") {
    return {
      valid: false,
      message: "Estado incorrecto debe escoger entre pendiente, cancelado y entregado"
    };
  }
  return true;
};
  const columns = [
    {
      dataField: "_id",
      text: "#",
      sort: true,
      formatter: (cellContent, row, rowIndex) => {
        return(
          <strong>{rowIndex+1}</strong>
        );
      }
    },
    {
      dataField: "sale",
      text: "Venta",
      sort: true,
      formatter: (cellContent, row) => {
        return(
          <div><div className="title-th" data-title="Venta: "></div>{row.sale}</div>
        );}
    },
    {
      dataField: "description",
      text: "Descripción",
      sort: true,
      formatter: (cellContent, row) => {
        return(
          <div><div  className="title-th" data-title="Descripción: "></div>{row.description}</div>
        );}
    },
    {
      dataField: "value",
      text: "Valor Total",
      type: "number",
      editable: function(rowData) {
        return rowData.allowEdit === false;
      },
      validator: numberValidator,
      sort: true,
      formatter: (cellContent, row) => {
        return(
          <div><div  className="title-th" data-title="Valor Total: "></div>{Intl.NumberFormat().format(row.value)}</div>
        );}
    },
    {
        dataField: "quantity",
        text: "Cantidad",
        type: "number",
        validator: numberValidator,
        sort: true,
        formatter: (cellContent, row) => {
          return(
            <div><div  className="title-th" data-title="Cantidad: "></div>{row.quantity}</div>
          );}
      },
      {
        dataField: "unitValue",
        text: "Valor Unitario",
        type: "number",
        validator: numberValidator,
        sort: true,
        formatter: (cellContent, row) => {
          return(
            <div><div  className="title-th" data-title="Valor Unitario: "></div>{Intl.NumberFormat().format(row.unitValue)}</div>
          );}
      },
      {
        dataField: "date",
        text: "Fecha",
        sort: true,
        formatter: (cellContent, row) => {
          const date = new Date(row.date)
          const y= date.getFullYear();
          const m = date.getMonth();
          const d = date.getDay();
          function n(n){ return n > 9 ? "" + n: "0" + n; }
          return(
              <div><div  className="title-th" data-title="Fecha: "></div>{y+"-"+n(m)+"-"+n(d)}</div>
            );
              }
      },
      {
        dataField: "document",
        text: "Documento",
        validator: numberValidator,
        sort: true,
        formatter: (cellContent, row) => {
          return(
            <div><div  className="title-th" data-title="Documento: "></div>{row.document}</div>
          );}
      },
      {
        dataField: "client",
        text: "Cliente",
        sort: true,
        formatter: (cellContent, row) => {
          return(
            <div><div  className="title-th" data-title="Cliente: "></div>{row.client}</div>
          );}
      },
      {
        dataField: "seller",
        text: "Vendedor",
        sort: true,
        formatter: (cellContent, row) => {
          return(
            <div><div  className="title-th" data-title="Vendedor: "></div>{row.seller}</div>
          );}
      },
    {
      dataField: "stateSale",
      text: "Estado",
      sort: true,
      validator:stateValidator,
      formatExtraData: state,

      formatter: (cellContent, row) => {
        if(row.stateSale.toLowerCase()==="entregado")
        return(
          <div><div className="title-th" data-title="Estado: "></div><span className="status-p bg-success text-white">Entregado</span>
        </div>
        );
      
      else if(row.stateSale.toLowerCase()==="cancelado")
        return(
          <div><div className="title-th" data-title="Estado: "></div>
          <span className="status-p bg-danger text-white">Cancelado</span></div>
        );
        else if(row.stateSale.toLowerCase()==="en proceso")
        return(
          <div><div className="title-th" data-title="Estado: "></div> 
          <span className="status-p bg-warning text-white">En proceso</span></div>
        )}
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

      formatter: (cellContent, row, rowIndex) => {
        if (row.state)
          return (
            <div className="action">
              <button className="btn btn-primary btn-xs"
                onClick={() => {
                  


                  setState(prev => {
                    row.state = null;
                    let newState = { ...prev, state: row.state, row: null };
                    const value = row.unitValue*row.quantity;
                    const save={sale:row.sale, description:row.description, value:value, quantity:row.quantity, unitValue:row.unitValue, date:row.date, document:row.document, client:row.client, seller:row.seller, stateSale:row.stateSale}
                    
                    console.log(row._id + save)
                    handleEdit(row._id, save);

                    setTitle("La venta: "+row.sale)
                    setMensaje("Fue actualizada correctamente.")
                    setVariant("success")
                    setShowAlert(true);
                    //alert("Venta actualizado correctamente.");
                    return newState;
                  });
                }}
              ><FontAwesomeIcon icon={faSave} />      
              </button>
              <button
                className="btn btn-danger btn-xs box" 
                onClick={() => {
                  setSales(prev => {
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
      dataField: "sale",
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
      fetch(`${BASE_URL}${PATH}/${id}`, requestOptions)
        .then(result => result.json())
        .then(
          (result) => {
            console.log("Venta "+data.sale+" editada");
            console.log(result);
            retrieveSales();
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
        fetch(`${BASE_URL}${PATH}/${rowId}`, requestOptions)
          .then(result => result.json())
          .then(
            (result) => {
              console.log("Venta borrada");
            console.log(result);
              retrieveSales();
            },
            (error) => {
              console.log(error);
            }
          );
      });
  };
  const handleSaveAdd = (sale, description, value, quantity, unitValue, date, document, client, seller, stateSale) => {
    const save={sale: sale, description: description, value: value, quantity: quantity, unitValue: unitValue, date: date, document: document, client: client, seller: seller, stateSale: stateSale}
      user.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(save)
      };
      fetch(`${BASE_URL}${PATH}`, requestOptions)
        .then(
          (response) => {
            response.json();
            console.log("Venta: "+sale+" agregada");
            console.log(response);
            retrieveSales();
            setTitle("La venta: "+ sale)
            setMensaje("Fue registrado correctamente.")
                        setVariant("success")
                        setShowAlert(true);
            handleClose();
          },
          (error) => {
            
          })
    });
       
  };
  const handleNewRow = () => {
    handleShow();
    
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
      <Col> 
      <div className="add">
        <Button variant="primary" onClick={handleNewRow}>
        <FontAwesomeIcon icon={faPlusCircle} />
           <span className="buttonText">Agregar Venta</span>
        </Button>
      </div></Col>
      </Row>
<Row >
  
  <ToolkitProvider 
  keyField="_id"
  data={ sales }
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


<NewSale
        show={show}
        onCancel={handleClose}
        onSave={handleSaveAdd}
        id={sales.length+1}
      />
    </>
  );
}


