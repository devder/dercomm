import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
	root: {
		flexGrow: 1,
	},
	cardActions: {
		display: "flex",
		justifyContent: "space-between",
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	navigate: {
		fontFamily: "Old Standard TT, serif",
		// fontWeight: 400,
		fontSize: 18,
		letterSpacing: "0.9px",
		listStyleType: "circle",
	},
}));

const Info = ({ products, match, onAddToCart }) => {
	const classes = useStyles();
	const [id] = useState(match.params.id);
	const [product, setProduct] = useState();
	// const [allProducts] = useState(products);

	const findProduct = () => {
		const foundProduct = products.find((product) => product.id === id);
		setProduct(foundProduct);
	};

	useEffect(() => {
		findProduct();
	}, []);

	if (!product)
		return (
			<>
				<div className={classes.toolbar} /> <h2>Loading...</h2>{" "}
			</>
		);
	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Grid container justify="center">
				<Grid item xs={12} sm={9} md={9} lg={6}>
					<Card className={classes.root}>
						<CardMedia
							className={classes.media}
							image={product.media.source}
							title={product.name}
						/>
						<CardContent>
							<div className={classes.cardContent}>
								<Typography gutterBottom variant="h5">
									{product.name}
								</Typography>
								<Typography variant="h5">
									{product.price.formatted_with_symbol}
								</Typography>
							</div>
							<h2>
								<em>
									This is a demo project with functionalities of an E-commerce
									App.
								</em>
							</h2>

							<p className={classes.navigate}>How to Navigate:</p>
							<ul className={classes.navigate}>
								<li>
									Click the AddShoppingCart Icon on the bottom right of an Item
									to add to cart
								</li>
								<li>
									Click the Cart Icon on the right of the Navbar to view your
									cart
								</li>
								<li>
									You can increase/decrease the quantity of items in your cart
									by clicking their respective buttons{" "}
								</li>
								<li>
									You can also remove products from the cart or empty the cart{" "}
								</li>
								<li>Proceed to check out</li>
								<li>Fill in the corresponding details</li>
								<li>Card transactions are secured with Stripe</li>
								<li>
									Click Pay and you'll receive an auto-generated email with
									details of your purchase
								</li>
								<li>
									At the same time, the store owner will be notified about your
									order
								</li>
								<li>
									N/B: User Authentication is <strong>NOT</strong> required as
									every user is unique so long as they access the App from a
									different browser.{" "}
								</li>
							</ul>
						</CardContent>
						<CardActions disableSpacing className={classes.cardActions}>
							<Button
								size="small"
								color="primary"
								variant="contained"
								// style={{ color: "#E6BF54" }}
								component={Link}
								to="/"
							>
								Go Back
							</Button>
							<IconButton
								aria-label="Add to Cart"
								onClick={() => onAddToCart(product.id, 1)}
							>
								<AddShoppingCart />
							</IconButton>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</main>
	);
};

export default Info;
