import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,  faTrashAlt, faPlusCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from "reactstrap";
import ProductDataService from "../../services/product"

import NewProduct from "../Form/NewProductForm";
import Alerta from "../Alerta";

const { SearchBar } = Search;

export default function ProductsTable() {
  const cadenaABooleano = cadena => cadena === "true";
 const [products, setProducts] = useState([]); // transformers products

 const key =  products.map(el => el._id);
  useEffect(() => {
    retrieveProducts();
  }, []);
  
  const retrieveProducts = () => {
  ProductDataService.getAll()
  .then(response => {
    setProducts(response.data);     
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
  const [show,setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
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
    if (newValue.toLowerCase()!=="true" && newValue.toLowerCase()!=="false") {
      return {
        valid: false,
        message: "Estado incorrecto debe escoger entre true y false"
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
      dataField: "price",
      text: "Valor Unitario",
      type: "number",
      validator: numberValidator,
      sort: true,
      formatter: (cellContent, row) => {
        
        return(
          <div>$ {Intl.NumberFormat().format(row.price)}</div>
        );
      
      
       
        }


    },
    {
      dataField: "stateProduct",
      text: "Estado",
      sort: true,
      validator: stateValidator,
      formatExtraData: state,

      formatter: (cellContent, row) => {
        if(row.stateProduct===true)
        return(
          <div className="status-p bg-success text-white">Disponible</div>
        );
      
      else if(row.stateProduct === false)
        return(
          <span className="status-p bg-danger text-white">No Disponible</span>
        )
      else
      return(
        <span className="status-p bg-warning text-white">{row.stateProduct}</span>
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
                    
                    const stateProduct = cadenaABooleano(row.stateProduct);
                    row.stateProduct= stateProduct;

                    const save={product:row.product, description:row.description, price:row.price, stateProduct:stateProduct}
                    console.log(row._id + save)
                    handleEdit(row._id, save);

                    setTitle("El producto: "+row.product)
                    setMensaje("Fue actualizado correctamente.")
                    setVariant("success")
                    setShowAlert(true);


                    //alert("Producto actualizado correctamente.");
                    return newState;
                  });
                }}
              ><FontAwesomeIcon icon={faSave} />
                
              </button>
              <button
                className="btn btn-danger btn-xs box" 
                onClick={() => {
                  setProducts(prev => {
                    let newVal = prev.map(el => {
                      if (el._id === row._id) {
                        row.stateProduct= cadenaABooleano(row.stateProduct);
                        return state.oldValue;

                      }
                      return el;
                    });
                    return newVal;
                  });
                  
                  setState(prev => {
                    row.state = null;
                    row.stateProduct= cadenaABooleano(row.stateProduct);
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
                onClick={() => handleDelete(row._id, rowIndex)}
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
      row.stateProduct= cadenaABooleano(row.stateProduct);
      let newVal = { ...prev, oldValue: { ...row } };
      
       return newVal;
    });
  };
  //edit
const handleEdit =(id, data) => {
  ProductDataService.updateProduct(id,data)
         .then(response => {
           console.log(response.data);
         })
         .catch(e => {
           console.log(e);
         });
       };
  //  delected the selected row
  const handleDelete = rowId => {
    ProductDataService.deleteProduct( rowId)
       .then(response => {
        retrieveProducts();
       })
       .catch(e => {
          console.log(e);
       });
   };
   const handleSaveAdd = ( product, description, unitValue, stateProduct) => {
    stateProduct= cadenaABooleano(stateProduct);
     const save ={product:product, description:description, stateProduct:stateProduct,price:unitValue }
    
     
    ProductDataService.createProduct(save)
    .then(response => {
      retrieveProducts();
        
        setTitle("El producto: "+product)
        setMensaje("Fue registrado correctamente.")
                    setVariant("success")
                    setShowAlert(true);
        handleClose();
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
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
      <div className="addProduct">
        <Button onClick={handleNewRow}>
        <FontAwesomeIcon icon={faPlusCircle} />
           <span className="buttonText">Agregar Producto</span>
        </Button>
      </div></Col>
      </Row>
<Row >
  
  <ToolkitProvider 
  keyField="_id"
  data={ products }
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


<NewProduct
        show={show}
        onCancel={handleClose}
        onSave={handleSaveAdd}
        id={products.length+1}
      />


     
     
    </>
  );
}
