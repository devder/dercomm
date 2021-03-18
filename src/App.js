import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import { commerce } from "./lib/commerce";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loader from "./components/Loader";
import Checkout from "./components/Checkout/Checkout";
import Info from "./components/Info/Info";

function App() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

	const fetchProducts = async () => {
		const response = await commerce.products.list();
		const { data } = response;
		setProducts(data);
	};

	const fetchCart = async () => {
		const cart = await commerce.cart.retrieve();
		setCart(cart);
	};

	const handleAddToCart = async (productId, quantity) => {
		const response = await commerce.cart.add(productId, quantity);

		setCart(response.cart);
	};

	const handleUpdateCartQty = async (productId, quantity) => {
		const response = await commerce.cart.update(productId, { quantity });
		setCart(response.cart);
	};

	const handleRemoveFromCart = async (productId) => {
		const { cart } = await commerce.cart.remove(productId);
		setCart(cart);
	};

	const handleEmptyCart = async () => {
		const { cart } = await commerce.cart.empty();
		setCart(cart);
	};

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();
		setCart(newCart);
	};

	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(
				checkoutTokenId,
				newOrder
			);
			setOrder(incomingOrder);
			refreshCart();
		} catch (error) {
			setErrorMessage(error.data.error.message);
		}
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
	return (
		<div style={{ display: "flex" }}>
			<CssBaseline />
			<Navbar
				totalItems={cart.total_items}
				handleDrawerToggle={handleDrawerToggle}
			/>
			<Switch>
				<Route
					exact
					path="/"
					render={(routeProps) => {
						if (products.length < 1) return <Loader />;
						return (
							<Products
								{...routeProps}
								products={products}
								onAddToCart={handleAddToCart}
							/>
						);
					}}
				/>
				<Route
					exact
					path="/info/:id"
					render={(routeProps) => (
						<Info
							{...routeProps}
							products={products}
							onAddToCart={handleAddToCart}
						/>
					)}
				/>
				<Route
					exact
					path="/cart"
					render={(routeProps) => (
						<Cart
							{...routeProps}
							cart={cart}
							handleUpdateCartQty={handleUpdateCartQty}
							handleRemoveFromCart={handleRemoveFromCart}
							handleEmptyCart={handleEmptyCart}
						/>
					)}
				/>
				<Route
					exact
					path="/checkout"
					render={(routeProps) => (
						<Checkout
							{...routeProps}
							cart={cart}
							order={order}
							onCaptureCheckout={handleCaptureCheckout}
							error={errorMessage}
						/>
					)}
				/>
				<Route
					render={() => (
						<h1 style={{ marginTop: "100px" }}>ERROR, PAGE NOT FOUND</h1>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
