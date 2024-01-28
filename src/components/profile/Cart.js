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
import AuthContext from "../context/AuthProvider";
import UserProfileContext from "../context/UserProfileContext";
import OrdersContext from "../context/OrdersContext";
import CartItem from "./CartItem";
import "./Cart.module.css";
import {
  checkOutOrder,
  createNewOrder,
  getAllOrders,
} from "../../services/api";

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
          // Merge items from all TEMP orders into a single array
          const cartItems = tempOrders.map((order) => order.item).flat();

          setCart(cartItems);

          // Assuming you want details from the first TEMP order
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

          // If the first TEMP order was closed, clear the cart
          if (orderDetailsData.status === "CLOSE") {
            setCart([]);
          }
        }

        // Set the closed orders in the state
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

  const handleOrderClick = () => {
    setExpandedOrder((prevExpandedOrder) =>
      prevExpandedOrder === orderDetails.orderNumber
        ? null
        : orderDetails.orderNumber
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
        // Checkout the current order
        await checkOutOrder(orderDetails.orderNumber, {}, auth.token);

        const orderItems = orderDetails.items;

        // Remove the checked out items from the cart
        setCart((prevCart) =>
          prevCart.filter((cartItem) =>
            orderItems.every((orderItem) => orderItem.id !== cartItem.id)
          )
        );

        // Add the current order to the closed orders list
        setOrders((prevOrders) => [
          {
            orderNumber: orderDetails.orderNumber,
            orderDate: new Date().toISOString(),
            status: "CLOSE",
            items: orderItems,
          },
          ...prevOrders,
        ]);

        // Clear the order details for the new order
        setOrderDetails({
          userId: userDetails,
          orderDate: null,
          shippingAddress: "",
          status: "TEMP", // Set the status for the new order
          orderNumber: "NEW", // Set a new order number (or any other identifier)
          items: [],
        });

        // Reload the cart to get the updated list
        handlerLoadCart();
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

      <div id="cartContainer">
        {orderDetails.status === "TEMP" && (
          <>
            <Typography variant="h6">Items in Cart</Typography>
            {cart.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <CartItem item={item} />
                        </TableCell>
                      </TableRow>
                    ))}
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
          </>
        )}

        {orders.length > 0 && (
          <div className="closedOrdersContainer">
            <Typography variant="h6">Closed Orders</Typography>
            <TableContainer component={Paper} className="closedOrdersTable">
              <Table>
                <TableBody>
                  {orders.map((order) => (
                    <React.Fragment key={order.orderNumber}>
                      <TableRow
                        onClick={() => setExpandedOrder(order.orderNumber)}
                      >
                        <TableCell>Order Number: {order.orderNumber}</TableCell>
                      </TableRow>
                      {expandedOrder === order.orderNumber && (
                        <>
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
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
