import React, { Component } from "react";
import "./editProduct.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import editProductBroadcast from "../../actions/editProductBroadcast";
import { Row, Col, Form, Button } from "react-bootstrap";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      categoryname: "Electronics",
      productname: "",
      productquantity: "",
      productprice: "",
      instock: "YES",
      img: "",
    };
  }

  componentWillMount() {
    console.log(this.props.history.location.state);
    let tempState = this.props.history.location.state;
    this.setState({
      id: tempState.id,
      categoryname: tempState.category,
      productname: tempState.name,
      productquantity: tempState.quantity,
      productprice: tempState.price,
      instock: tempState.instock,
      img: tempState.img,
    });
  }

  changeHandler = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    this.setState({ [name]: val });
     };

  contactSubmit = (event) => {
    event.preventDefault();
    let newProduct = {
      id: this.state.id,
      category: this.state.categoryname,
      name: this.state.productname,
      price: this.state.productprice,
      quantity: this.state.productquantity,
      instock: this.state.instock,
      img: this.state.img,
    };

    console.log(newProduct);
    this.props.editProduct(newProduct);
    this.props.history.push("/");
  };

  render() {
    return (
        <div className="container-main">
          <header id="addProduct-header">EDIT PRODUCT</header>
          <form onSubmit={this.contactSubmit}>

            <Row>
              <Col>
                <label htmlFor="categoryname">Category Name:</label>
              
                <select
                  name="categoryname"
                  className="input-select"
                  onChange={this.changeHandler}
                  value={this.state.categoryname}
                >
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Clothing</option>
                </select>
                </Col>
                <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                   type="text"
                   className="input-text"
                   id="productname"
                   name="productname"
                   autoComplete="off"
                   value={this.state.productname}
                   placeholder="Enter Product Name.."
                   onChange={this.changeHandler}
                   title="Name should consists of letters and greater than length 3"
                   required
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    className="input-text"
                    id="productprice"
                    name="productprice"
                    autoComplete="off"
                    value={this.state.productprice}
                    placeholder="Enter Product Price.."
                    onChange={this.changeHandler}
                    title="Price should be a number"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                     type="number"
                     className="input-text"
                     id="productquantity"
                     name="productquantity"
                     autoComplete="off"
                     value={this.state.productquantity}
                     placeholder="Enter Product Quantity.."
                     onChange={this.changeHandler}
                     title="Quantity should be a number"
                     required
                  />
                </Form.Group>
              </Col>

              <Col>
                <div>
                  <label>Stock</label>
                </div>
                <select
                  name="instock"
                  className="input-select"
                  onChange={this.changeHandler}
                  value={this.state.instock}
                >
                  <option>YES</option>
                  <option>NO</option>
                </select>
              </Col>
            </Row>
              <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Image Url</Form.Label>
                  <Form.Control
                   type="text"
                   className="input-text"
                   id="img"
                   name="img"
                   autoComplete="off"
                   value={this.state.img}
                   placeholder="Enter imgUrl"
                   onChange={this.changeHandler}
                   title="url should be a link"
                   required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="outline-dark" type="submit" size="lg" block>
                  Edit
                </Button>
              </Col>
            </Row>
          </form>
          
        </div>
    );
  }
}

function convertPropToEventAndBroadcast(dispatch) {
  return bindActionCreators(
    {
      editProduct: editProductBroadcast,
    },
    dispatch
  );
}

export default connect(null, convertPropToEventAndBroadcast)(EditProduct);
