import React, { Component } from "react";

import axios from "axios";

import sendProductsBroadcast from "../../actions/sendProductsBroadcast";

import "./home.css";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import deleteProductBroadcast from "../../actions/deleteProductBroadcast";

import {Card} from "react-bootstrap";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      productList: [],
    };
  }

  componentWillMount() {
    if (this.props.allproducts.length === 0) {
      this.getAllProducts();
    }

    this.setState({ productList: this.props.allproducts });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.allproducts !== this.props.allproducts) {
      console.log("prop updateds");

      this.setState({ productList: newProps.allproducts });
    }
  }

  getAllProducts = () => {
    axios.get("http://localhost:3000/products").then(
      (res) => {
        console.log(res.data);

        this.props.sendProducts(res.data);

        this.setState({ productList: this.props.allproducts });
      },

      (err) => {
        console.log(err);
      }
    );
  };

  updateProduct = (product) => {
    // console.log(this.props)

    // console.log("update clicked!!")

    this.props.history.push({
      pathname: "/editProduct",

      state: product,
    });
  };

  deleteProduct = (id) => {
    // console.log(id)

    this.props.delProduct(id);

    // console.log(this.props.deleteProduct(id));
  };

  addProductClick = () => {
    this.props.history.push("/addProduct");
  };

  getSearch = (e) => {
    let searchV = e.target.value;

    console.log(searchV);

    if (searchV !== " ") {
      let searchP = this.props.allproducts.filter((f) => {
        return f.name.toLowerCase().includes(searchV);
      });

      this.setState({ productList: searchP });
    } else {
      this.displayProducts();
    }
  };

  categoryFilter = (event) => {
    let categoryV = event.target.value;

    if (categoryV !== " ") {
      this.setState({ categoryValue: categoryV });

      let categoryP = this.props.allproducts.filter((f) => {
        return f.category.match(categoryV);
      });

      this.setState({ productList: categoryP });
    } else {
      this.displayProducts();
    }
  };

  displayProducts = () => {
    if (this.state.productList.length !== 0) {
      return this.state.productList.map((product) => {
        return (
          <div className="grid" style={{marginTop:50,border:'1px solid rgb(156, 30, 30)'}}>
            <Card  className="cards" style={{ width: 300 ,border:'1px solid rgb(156, 30, 30)',height:550 , }}>
        <Card.Img variant="top" src={product.img} style={{height:200}} />
        <Card.Body>
          <Card.Title style={{textAlign:"center"}}>{product.name}</Card.Title>
          <Card.Text>Price:
            {product.price}
            <br/><br/>
            Category:{product.category}
            <br/><br/>
            Quantity:{product.quantity}
            <br/><br/>
            InStock:{product.instock}
            <br/><br/>
            </Card.Text>
            </Card.Body>
            <br/><br/>
        <button onClick={() => this.updateProduct(product)} className="btn-edit">Edit</button>
            &nbsp;
            <button  onClick={() => this.deleteProduct(product.id)} className="btn-delete">Delete</button>
      </Card>
     
         
  </div>
        );
      });
    } else {
      console.log("noo");
      return (
        <tr>
          <td colSpan="6"> No Such Product Found!!!</td>
        </tr>
      );
    }
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <button className="addbutton button1" onClick={this.addProductClick}>
            Add Product
          </button>

          <label>Search:</label>

          <input
            className="search-bar"
            value={this.state.searchValue}
            onChange={this.getSearch}
            name="search"
          ></input>

          <select
            id="category"
            name="Category :"
            onChange={this.categoryFilter}
          >
            <option value="" selected="true">
              Select
            </option>

            <option value="Electronics">Electronics</option>

            <option value="Clothing">Clothing</option>

            <option value="Mobile">Mobile</option>

            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <div className="container-card" style={{marginTop:20,height:550}}>
        {this.displayProducts()}
          </div>
      </div>
    );
  }
}

function convertStoreToProps(store) {
  // console.log("Received complete store....in home container");

  // console.log(store);

  return {
    allproducts: store.getProduct,
  };
}

function convertPropToEventAndBroadcast(dispatch) {
  return bindActionCreators(
    {
      delProduct: deleteProductBroadcast,

      sendProducts: sendProductsBroadcast,
    },

    dispatch
  );
}

export default connect(
  convertStoreToProps,

  convertPropToEventAndBroadcast
)(Home);
