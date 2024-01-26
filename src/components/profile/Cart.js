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
  const [orderDetails, setOrderDetails] = useState({
    userId: userDetails.id,
    orderDate: null,
    shippingAddress: "",
    status: "TEMP",
    orderNumber: null,
    items: [], // Initialize items as an empty array
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const splitOrdersByStatus = (orders) => {
    const tempOrders = orders.filter((order) => order.status === "TEMP");
    const closeOrders = orders.filter((order) => order.status === "CLOSE");
    return [tempOrders, closeOrders];
  };

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

        const orderDetailsData = response.data[0].order || {};
        const items = cartItems.map((cartItem) => ({
          id: cartItem.id,
          title: cartItem.title,
          photo: cartItem.photo,
          price: cartItem.price,
          availableStock: cartItem.availableStock,
          quantity: cartItem.quantity,
        }));

        setOrderDetails({
          userId: userDetails.id,
          orderDate: orderDetailsData.orderDate,
          shippingAddress: orderDetailsData.shippingAddress,
          status: orderDetailsData.status,
          orderNumber: orderDetailsData.id,
          items: items,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart details:", error);
      setError("Error fetching cart details. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    handlerLoadCart();
  }, [auth.token, userDetails.id, setCart]);

  const handleCloseOrder = (orderNumber) => {
    setExpandedOrder((prevExpandedOrder) =>
      prevExpandedOrder === orderNumber ? null : orderNumber
    );
  };

  const handlerCheckout = async () => {
    try {
      if (orderDetails.orderNumber && cart.length > 0 && auth.token) {
        await checkOutOrder(orderDetails.orderNumber, {}, auth.token);

        if (orderDetails.status === "TEMP") {
          setOrders((prevOrders) => [
            {
              orderNumber: orderDetails.orderNumber,
              orderDate: new Date().toISOString(),
              status: "CLOSE",
              items: orderDetails.items,
            },
            ...prevOrders,
          ]);
        }

        setOrderDetails((prevOrder) => ({
          ...prevOrder,
          status: "CLOSE",
          orderDate: new Date().toISOString(),
        }));

        setCart([]);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  function calculateTotalPrice(orderItems) {
    return orderItems.reduce((total, item) => {
      const itemPrice = item.price || 0;
      return total + itemPrice;
    }, 0);
  }

  return (
    <div>
      <h1>My Cart</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orderDetails.orderNumber && (
        <>
          <h2>Order Details</h2>
          <p>Order Number: {orderDetails.orderNumber}</p>
          <p>Order Date: {new Date(orderDetails.orderDate).toLocaleString()}</p>
          <p>Shipping Address: {orderDetails.shippingAddress}</p>
          <p>Status: {orderDetails.status}</p>

          {/* Render the current "TEMP" status order at the top */}
          {orderDetails.status === "TEMP" && (
            <div id="cartContainer">
              <Typography variant="h6">Items in Cart</Typography>
              {cart.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        {cart.map((item) => (
                          <TableCell key={item.id}>
                            <CartItem item={item} />
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2">Your cart is empty.</Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                className="checkoutButton"
                onClick={handlerCheckout}
              >
                Checkout
              </Button>
            </div>
          )}
          {/* Render a table for closed orders */}
          {orders.length > 0 && (
            <div className="closedOrdersContainer">
              <Typography variant="h6">Closed Orders</Typography>
              <TableContainer component={Paper} className="closedOrdersTable">
                <Table>
                  <TableBody>
                    {orders.map((order) => (
                      <div
                        key={order.orderNumber}
                        className="order-container"
                        onClick={() => setExpandedOrder(order.orderNumber)}
                      >
                        <Typography variant="h6" className="order-number">
                          Order Number: {order.orderNumber}
                        </Typography>
                        {expandedOrder === order.orderNumber && (
                          <React.Fragment>
                            {/* Render other summary information here */}
                            <TableRow>
                              <TableCell>Order Date</TableCell>
                              <TableCell>
                                {new Date(order.orderDate).toLocaleString()}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Status</TableCell>
                              <TableCell>{order.status}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Total Price</TableCell>
                              <TableCell>
                                ${calculateTotalPrice(order.items)}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Items Purchased</TableCell>
                              <TableCell>
                                {/* Render the items table here */}
                                <Table>
                                  <TableBody>
                                    <TableRow>
                                      {order.items.map((orderItem) => (
                                        <TableCell key={orderItem.id}>
                                          <CartItem item={orderItem} />
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        )}
                      </div>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
