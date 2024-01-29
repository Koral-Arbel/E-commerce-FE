import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Typography,
  Paper,
  TableBody,
  TableCell,
  Card,
  CardContent,
  TableRow,
  Collapse,
  CardActionArea,
} from "@mui/material";
import AuthContext from "../context/AuthProvider";
import UserProfileContext from "../context/UserProfileContext";
import OrdersContext from "../context/OrdersContext";
import CartItem from "./CartItem";
import { checkOutOrder, getAllOrders } from "../../services/api";
import "./Cart.module.css";

function Cart() {
  const { auth } = useContext(AuthContext);
  const { userDetails } = useContext(UserProfileContext);
  const { orders, setOrders } = useContext(OrdersContext);

  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    userId: userDetails,
    orderDate: null,
    shippingAddress: "",
    status: "TEMP",
    orderNumber: null,
    items: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    handlerLoadCart();
  }, [auth.token, userDetails, setCart]);

  const clearError = () => {
    setError(null);
  };

  const handlerLoadCart = async () => {
    try {
      if (!auth || !auth.token || !userDetails) {
        setLoading(false);
        return;
      }

      const response = await getAllOrders(userDetails.id, auth.token);

      if (response.data) {
        const tempOrders = response.data.filter(
          (order) => order.order.status === "TEMP"
        );

        const closedOrders = response.data.filter(
          (order) => order.order.status === "CLOSE"
        );

        if (tempOrders.length > 0) {
          const cartItems = tempOrders.map((order) => order.item).flat();

          setCart(cartItems);

          const orderDetailsData = tempOrders[0].order || {};

          setOrderDetails({
            ...orderDetails,
            orderNumber: orderDetailsData.id,
            orderDate: orderDetailsData.orderDate,
            shippingAddress: orderDetailsData.shippingAddress,
            items: cartItems.map((cartItem) => ({
              id: cartItem.id,
              title: cartItem.title,
              photo: cartItem.photo,
              price: cartItem.price,
              availableStock: cartItem.availableStock,
              quantity: cartItem.quantity,
            })),
          });

          if (orderDetailsData.status === "CLOSE") {
            setCart([]);
          }
        }

        setOrders(
          closedOrders.map((closedOrder) => ({
            orderNumber: closedOrder.order.id,
            orderDate: closedOrder.order.orderDate,
            status: closedOrder.order.status,
            items: closedOrder.item.map((orderItem) => ({
              id: orderItem.id,
              title: orderItem.title,
              photo: orderItem.photo,
              price: orderItem.price,
              availableStock: orderItem.availableStock,
              quantity: orderItem.quantity,
            })),
          }))
        );
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart details:", error);
      setError("Error fetching cart details. Please try again later.");
      setLoading(false);
    }
  };

  const handleCloseOrder = (orderNumber) => {
    setExpandedOrder((prevExpandedOrder) =>
      prevExpandedOrder === orderNumber ? null : orderNumber
    );
  };

  const handleOrderClick = (orderNumber) => {
    setExpandedOrder((prevExpandedOrder) =>
      prevExpandedOrder === orderNumber ? null : orderNumber
    );
  };

  const handlerCheckout = async () => {
    try {
      if (
        orderDetails.orderNumber &&
        cart.length > 0 &&
        auth.token &&
        orderDetails.status === "TEMP"
      ) {
        await checkOutOrder(orderDetails.orderNumber, {}, auth.token);

        const orderItems = orderDetails.items;

        setCart((prevCart) =>
          prevCart.filter((cartItem) =>
            orderItems.every((orderItem) => orderItem.id !== cartItem.id)
          )
        );

        setOrders((prevOrders) => [
          {
            orderNumber: orderDetails.orderNumber,
            orderDate: new Date().toISOString(),
            status: "CLOSE",
            items: orderItems,
          },
          ...prevOrders,
        ]);

        setOrderDetails({
          userId: userDetails,
          orderDate: orderDetails.Date.toLocaleString,
          shippingAddress: "",
          status: "TEMP",
          orderNumber: "NEW",
          items: [],
        });

        handlerLoadCart();
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  function calculateTotalPrice(orderItems) {
    return orderItems.reduce((total, item) => total + (item.price || 0), 0);
  }

  return (
    <div>
      <h1>My Cart</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div id="cartContainer">
        {orderDetails.status === "TEMP" && (
          <>
            <Typography variant="h6">Items in Cart</Typography>
            {cart.length > 0 ? (
              <Paper>
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    expanded={expandedOrder === orderDetails.orderNumber}
                    onOrderClick={() =>
                      handleOrderClick(orderDetails.orderNumber)
                    }
                  />
                ))}
              </Paper>
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
          </>
        )}

        {orders.length > 0 && (
          <div className="closedOrdersContainer">
            <Typography variant="h6">Closed Orders</Typography>
            <Paper className="closedOrdersTable">
              {orders.map((order) => (
                <Card
                  key={order.orderNumber}
                  onClick={() => handleCloseOrder(order.orderNumber)}
                  className="closedOrderCard"
                >
                  <CardContent>
                    <Typography variant="subtitle1">
                      Order Number: {order.orderNumber}
                    </Typography>
                    <Collapse in={expandedOrder === order.orderNumber}>
                      <CardActionArea>
                        <TableBody>
                          <TableRow>
                            <TableCell>Order Date:</TableCell>
                            <TableCell>
                              {new Date(order.orderDate).toLocaleString()}
                            </TableCell>
                            <TableCell>Status:</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>Total Price:</TableCell>
                            <TableCell>
                              ${calculateTotalPrice(order.items)}
                            </TableCell>
                            <TableCell>Items Purchased:</TableCell>
                            <TableCell>
                              <Paper style={{ display: "flex" }}>
                                {order.items.map((orderItem) => (
                                  <CartItem
                                    key={orderItem.id}
                                    item={orderItem}
                                    expanded={
                                      expandedOrder === order.orderNumber
                                    }
                                    onOrderClick={() =>
                                      handleOrderClick(order.orderNumber)
                                    }
                                  />
                                ))}
                              </Paper>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </CardActionArea>
                    </Collapse>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
