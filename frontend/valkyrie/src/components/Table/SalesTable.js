import React, { useState } from "react";
import { Button } from "react-bootstrap";
import data from '../Json/salesData.json';
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,  faTrashAlt, faPlusCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from "reactstrap";

import NewSale from "../Form/NewSaleform.js";

const key =  data.map(el => el.id); 

const { SearchBar } = Search;

const entry = {
  id: null,
  sale: null,
  description: null,
  client: null,
  seller: null,
  value:null, 
  quantity:null, 
  unitValue:null, 
  date:null, 
  document:null, 
  stateSale:null,
};

export default function SalesTable() {
  
    
  // To delete rows you be able to select rows
  const [state, setState] = useState({
    row: null,
    state: null,
    oldValue: null
  });

  const [show,setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [sales, setSales] = useState( data); // transformers sales
  

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

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true
    },
    {
      dataField: "sale",
      text: "Venta",
      sort: true
    },
    {
        dataField: "description",
        text: "Descripción",
        sort: true
      },
    {
      dataField: "value",
      text: "Valor Total",
      type: "number",
      validator: numberValidator,
      sort: true
    },
    {
        dataField: "quantity",
        text: "Cantidad",
        type: "number",
        validator: numberValidator,
        sort: true
      },
      {
        dataField: "unitValue",
        text: "Valor Unitario",
        type: "number",
        validator: numberValidator,
        sort: true
      },
      {
        dataField: "date",
        text: "Fecha",
        sort: true
      },
      {
        dataField: "document",
        text: "Documento",
        sort: true
      },
      {
        dataField: "client",
        text: "Cliente",
        sort: true
      },
      {
        dataField: "seller",
        text: "Vendedor",
        sort: true
      },
    {
      dataField: "stateSale",
      text: "Estado",
      sort: true,
      
      formatExtraData: state,

      formatter: (cellContent, row) => {
        if(row.stateSale.toLowerCase()==="disponible")
        return(
          <div className="status-p bg-success text-white">Disponible</div>
        );
      
      else if(row.stateSale.toLowerCase()==="no disponible")
        return(
          <span className="status-p bg-danger text-white">No Disponible</span>
        )
      else
      return(
        <span className="status-p bg-warning text-white">{row.stateSale}</span>
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

      formatter: (cellContent, row) => {
       

        if (row.state)
          return (
            <div>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  if(row.stateSale.toLowerCase()!=="cancelado" && row.stateSale.toLowerCase()!=="entregado"){
                    return(
                      alert("Estado incorrecto debe escoger entre cancelado y entregado")
                    );}
                    else{
                  setState(prev => {
                    
                    
                    row.state = null;
                    
                    let newState = { ...prev, state: row.state, row: null };
                    alert("Venta actualizado correctamente.");
                    return newState;
                  });}
                }}
              ><FontAwesomeIcon icon={faSave} />
                
              </button>
              <button
                className="btn btn-danger btn-xs box" 
                onClick={() => {
                  setSales(prev => {
                    let newVal = prev.map(el => {
                      if (el.id === row.id) {
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
                onClick={() => handleDelete(row.id)}
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
      dataField: "name",
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

  //  delected the selected row
  const handleDelete = rowId => {
    setSales(sales.filter(el => el.id !== rowId));
  };

   const handleSaveAdd = (id,sale, description, value, quantity,unitValue,date,document,client,seller,stateSale) => {
     
    // check duplicated id
     // eslint-disable-next-line no-loop-func
     while (sales.filter(el => el.id === id).length) {
      // the same id is entered
      id =id+1;
    }    

        setSales(prev => {
        let newEntry = { ...entry, id:id ,sale:sale, description:description, value:value, quantity:quantity, unitValue:unitValue, date:date, document:document, client:client, seller:seller, stateSale:stateSale};
        let newVal = [newEntry, ...prev];
        alert("Venta registrada correctamente.");
        return newVal;
      });
      handleClose();
    
  };
  const handleNewRow = () => {
    handleShow();
    
  };
  return (
    <>
    <Row >
      <Col> 
      <div className="addSale">
        <Button variant="primary" onClick={handleNewRow}>
        <FontAwesomeIcon icon={faPlusCircle} />
           <span className="buttonText">Agregar Venta</span>
        </Button>
      </div></Col>
      </Row>
<Row >
  
  <ToolkitProvider 
  keyField="id"
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
              state.row ? key.filter(el => el !== state.row.id) : []
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


