import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useStyles from "../../styles/cart-styles";
import CartItem from "./CartItem";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const Cart = ({
	cart,
	handleUpdateCartQty,
	handleRemoveFromCart,
	handleEmptyCart,
}) => {
	const classes = useStyles();

	const emptyCart = () => handleEmptyCart();

	const EmptyCart = () => (
		<Typography variant="subtitle1">
			You have no items in your cart,{" "}
			<Link to="/" className={classes.link}>
				start adding some
			</Link>
			!
		</Typography>
	);
	const FilledCart = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map((item) => (
					<Grid item xs={12} sm={4} key={item.id}>
						<CartItem
							item={item}
							onUpdateCartQty={handleUpdateCartQty}
							onRemoveFromCart={handleRemoveFromCart}
						/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant="h4">
					Subtotal {cart.subtotal.formatted_with_symbol}
				</Typography>
				<div>
					<Button
						className={classes.emptyButton}
						size="large"
						type="button"
						variant="contained"
						color="secondary"
						onClick={emptyCart}
					>
						Empty Cart
					</Button>
					<Button
						className={classes.checkoutButton}
						size="large"
						type="button"
						variant="contained"
						color="primary"
						component={Link}
						to="/checkout"
					>
						Checkout
					</Button>
				</div>
			</div>
		</>
	);

	if (!cart.line_items) return <Loader />;

	return (
		<Container>
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant="h3" gutterBottom>
				Your Shopping Cart
			</Typography>
			{!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
		</Container>
	);
};

export default Cart;
