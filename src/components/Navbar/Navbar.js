import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import logo from "../../assets/commerce.png";
import useStyles from "../../styles/navbar-styles";
import { Link, useLocation } from "react-router-dom";

function Navbar({ totalItems }) {
	const classes = useStyles();
	const location = useLocation();
	// const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	// const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	// const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

	// const mobileMenuId = "primary-search-account-menu-mobile";

	// const renderMobileMenu = (
	// 	<Menu
	// 		anchorEl={mobileMoreAnchorEl}
	// 		anchorOrigin={{ vertical: "top", horizontal: "right" }}
	// 		id={mobileMenuId}
	// 		keepMounted
	// 		transformOrigin={{ vertical: "top", horizontal: "right" }}
	// 		open={isMobileMenuOpen}
	// 		onClose={handleMobileMenuClose}
	// 	>
	// 		<MenuItem>
	// 			<IconButton
	// 				component={Link}
	// 				to="/cart"
	// 				aria-label="Show cart items"
	// 				color="inherit"
	// 			>
	// 				<Badge badgeContent={totalItems} color="secondary">
	// 					<ShoppingCart />
	// 				</Badge>
	// 			</IconButton>
	// 			<p>Cart</p>
	// 		</MenuItem>
	// 	</Menu>
	// );

	return (
		<>
			<AppBar position="fixed" color="inherit" className={classes.appBar}>
				<Toolbar>
					<Typography
						component={Link}
						to="/"
						variant="h6"
						color="inherit"
						className={classes.title}
					>
						<img
							src={logo}
							alt="Derick Commerce"
							height="25px"
							className={classes.image}
						/>
						Dericado
					</Typography>
					<div className={classes.grow} />
					{location.pathname !== "/cart" && (
						<div className={classes.button}>
							<IconButton
								aria-label="Show Cart Items"
								color="inherit"
								component={Link}
								to="/cart"
							>
								<Badge badgeContent={totalItems} color="secondary">
									<ShoppingCart />
								</Badge>
							</IconButton>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
}

export default Navbar;
