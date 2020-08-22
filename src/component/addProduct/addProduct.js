import React, { Component } from "react";
import "./addProduct.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import addProductBroadcast from "../../actions/newProductBroadcast";
import { Row, Col, Form, Button } from "react-bootstrap";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryname: "Electronics",
      productname: "",
      productquantity: "",
      productprice: "",
      instock: "YES",
      img: "",
    };
  }

  changeHandler = (event) => {
    // console.log(event.target.name)
    let name = event.target.name;
    let val = event.target.value;
    this.setState({ [name]: val });
    // console.log(this.state)
    // this.handleValidation();
  };

  contactSubmit = (event) => {
    event.preventDefault();
    let newProduct = {
      category: this.state.categoryname,
      name: this.state.productname,
      price: this.state.productprice,
      quantity: this.state.productquantity,
      instock: this.state.instock,
      img: this.state.img,
    };

    console.log(newProduct);
    this.props.sendNewProduct(newProduct);
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="container-main">
          <header id="addProduct-header">ADD PRODUCT</header>
          <form onSubmit={this.contactSubmit}>
            <Row>
              <Col>
                <label htmlFor="categoryname">Category Name</label>

                <select
                  name="categoryname"
                  className="input-select"
                  onChange={this.changeHandler}
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
                    placeholder="Enter Product Name"
                    id="productname"
                    name="productname"
                    autoComplete="off"
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
                    placeholder="Enter Product Quantity"
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
                    placeholder="Enter image Url"
                    onChange={this.changeHandler}
                    title="imgUrl should be a link"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="outline-dark" type="submit" size="lg" block>
                  Add
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    );
  }
}

function convertPropToEventAndBroadcast(dispatch) {
  return bindActionCreators(
    {
      sendNewProduct: addProductBroadcast,
    },
    dispatch
  );
}

export default connect(null, convertPropToEventAndBroadcast)(AddProduct);
