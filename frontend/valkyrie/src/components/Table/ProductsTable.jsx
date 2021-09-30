import React, { useState } from "react";
import { Button } from "react-bootstrap";
import data from '../Json/productData.json';
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import NewProduct from "../Form/NewProductForm";

const key =  data.map(el => el.id);

const { SearchBar } = Search;

const entry = {
  id: null,
  product: null,
  description: null,
  unitValue: null,
  stateProduct: null
};

export default function ProductsTable() {
  
    
  // To delete rows you be able to select rows
  const [state, setState] = useState({
    row: null,
    state: null,
    oldValue: null
  });

  const [show,setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [products, setProducts] = useState( data); // transformers products
  

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
        message: "This field should be numeric"
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
      dataField: "product",
      text: "Producto",
      sort: true
    },
    {
        dataField: "description",
        text: "Descripción",
        sort: true
      },
    {
      dataField: "unit_value",
      text: "Valor Unitario",
      type: "number",
      validator: numberValidator,
      sort: true
    },
    {
      dataField: "stateProduct",
      text: "Estado",
      sort: true,
      
      formatExtraData: state,

      formatter: (cellContent, row) => {
        if(row.stateProduct==="disponible")
        return(
          <div class="p-3 mb-2 bg-success text-white">Disponible</div>
        );
      
      else
        return(
          <div class="p-3 mb-2 bg-danger text-white">No Disponible</div>
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
      text: "Actions",
      editable: false,
      isDummyField: true,
      formatExtraData: state,

      formatter: (cellContent, row) => {
       

        if (row.state)
          return (
            <div>
              <button
                className="btn btn-secondary btn-xs"
                onClick={() => {
                  setState(prev => {
                    row.state = null;
                    let newState = { ...prev, state: row.state, row: null };
                    alert("Producto actualizado correctamente.");
                    return newState;
                  });
                }}
              >
                Save
              </button>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  setProducts(prev => {
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
                Cancel
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
                
                Delete
              </button>
            </div>
          );
      }
    }
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "ascd"
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
    setProducts(products.filter(el => el.id !== rowId));
  };

   const handleSaveAdd = (id, product, description, unitValue, stateProduct) => {
         setProducts(prev => {
        let newEntry = { ...entry, id: products.length+1, product:product, description:description, unit_value:unitValue, stateProduct:stateProduct };
        let newVal = [newEntry, ...prev];
        alert("Producto registrado correctamente.");
        return newVal;
      });
      handleClose();
    
  };
  const handleNewRow = () => {
    handleShow();
    
  };
  return (
    <>
      <div style={{ textAlign: "left" }}>
        <Button class="btn btn-warning" onClick={handleNewRow}>
         Agregar Producto
        </Button>
      </div>

      <ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  search
>
  {
    props => (
      <div>
        <SearchBar { ...props.searchProps } />
        <hr />
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
      </div>
    )
  }
</ToolkitProvider>
      


<NewProduct
        show={show}
        onCancel={handleClose}
        onSave={handleSaveAdd}
        id={products.length+1}
      />


     
     
    </>
  );
}
