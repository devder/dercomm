import Grid from "@material-ui/core/Grid";
import Product from "./Product";
import useStyles from "../../styles/products-styles";

function Products({ products, onAddToCart }) {
	const classes = useStyles();
	// console.log(products);
	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Grid container justify="center" spacing={4}>
				{products.map((product) => (
					<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
						<Product product={product} onAddToCart={onAddToCart} />
					</Grid>
				))}
			</Grid>
		</main>
	);
}

export default Products;
