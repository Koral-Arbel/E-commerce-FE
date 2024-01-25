import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import { checkOutOrder, getAllOrders } from "../../services/api";
import AuthContext from "../context/AuthProvider";
import UserProfileContext from "../context/UserProfileContext";
import CartContext from "../context/CartContext";
import OrdersContext from "../context/OrdersContext";
import CartItem from "./CartItem";
import "./Cart.module.css";

function Cart() {
  const { auth } = useContext(AuthContext);
  const { userDetails } = useContext(UserProfileContext);
  const { cart, setCart } = useContext(CartContext);
  const { orders, setOrders } = useContext(OrdersContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlerLoadCart = async () => {
    try {
      if (!auth || !auth.token || !userDetails.id) {
        setLoading(false);
        return;
      }

      const response = await getAllOrders(userDetails.id, auth.token);

      if (response.data) {
        const cartItems = response.data.map((order) => order.item).flat();
        setCart(cartItems);

        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching cart details:", error);
      setError("Error fetching cart details. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    handlerLoadCart();
  }, [auth.token, userDetails.id, setCart]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrder = () => {
    setSelectedOrder(null);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <h1>My Cart</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Render detailed information for the selected order */}
      {selectedOrder && (
        <div>
          <Typography
            variant="h6"
            style={{ fontSize: "1.5em", fontWeight: "bold" }}
          >
            Selected Order Details
          </Typography>
          <p>Order Number: {selectedOrder.orderNumber}</p>
          <p>
            Order Date: {new Date(selectedOrder.orderDate).toLocaleString()}
          </p>
          {/* Display additional information as needed */}
          <TableContainer component={Paper} className="closedOrdersTable">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Photo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder.items.map((orderItem) => (
                  <TableRow key={orderItem.id}>
                    <TableCell>{orderItem.title}</TableCell>
                    <TableCell>{orderItem.quantity}</TableCell>
                    <TableCell>${orderItem.price}</TableCell>
                    <TableCell>
                      <img
                        src={orderItem.photo}
                        alt={orderItem.title}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseOrder}
          >
            Close Order
          </Button>
        </div>
      )}

      {/* Render a list of closed orders */}
      {orders.length > 0 && (
        <div className="closedOrdersContainer">
          <Typography
            variant="h6"
            style={{ fontSize: "1.5em", fontWeight: "bold" }}
          >
            Closed Orders
          </Typography>
          {orders.map((order) => (
            <div
              key={order.orderNumber}
              style={{
                margin: "20px 0",
                cursor: "pointer",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
              onClick={() => handleOrderClick(order)}
            >
              <h3>Order Number: {order.orderNumber}</h3>
              <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
              {/* Additional information can be displayed here if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
