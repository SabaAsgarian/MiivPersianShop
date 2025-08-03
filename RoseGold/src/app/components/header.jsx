"use client"

import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import CallIcon from '@mui/icons-material/Call';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from './img/96d6f2e7e1f705ab5e59c84a6dc009b2.png'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LongMenu from './LongMenu'; // Ensure this import is correct
import Link from 'next/link';
import Image from 'next/image';
import myContext from '../myContext';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled as muiStyled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useMediaQuery } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import axios from 'axios'; // Import axios for API calls
import StarIcon from '@mui/icons-material/Star';
import left from './img/homeleft.jpg'
import PhoneEnabledSharpIcon from '@mui/icons-material/PhoneEnabledSharp';
import { useUser } from '../context/mycontext';
import "../globals.css"
// New styled component for the header
const HeaderContainer = muiStyled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 3),
}));

// New styled component for WhatsApp support
const SupportContainer = styled(Box)({
  width: '100%',
  backgroundColor: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0',
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const drawerWidth = '100%';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  position: 'static', // Change to static
  backgroundColor: '#f9f9f9', // Set background color to white
  color: 'black',
  borderTop: '1px solid #ececec',
  borderBottom: '1px solid #ececec',
  boxShadow: 'none' , // Change to static
  '&:hover': {
    color: '#f9f9f9',
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
  zIndex: '999',
  '&:hover': {
    color: '#ccaf71',
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: 'white', // Set background color to white
    color: 'black', // Set text color to black
    
  },
  zIndex: theme.zIndex.drawer + 2,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'black',
  marginLeft: ' 100px',
  textDecoration: 'none',
  fontSize:"18px",
  fontFamily:"mine",
  fontWeight:"400 400",
  
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#35b399',
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: 'black',
  transition: 'color 0.3s ease',
  fontFamily:"mineB",
  fontSize:"18px",
  textAlign:'center',
  '&:hover': {
    color: '#35b399',
    backgroundColor: 'transparent',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'black',
  transition: 'color 0.3s ease',
  
  '&:hover': {
    color: '#35b399',
    backgroundColor: 'transparent',
  },
}));

// Styled ListItemText for Drawer menu
const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  fontFamily: 'mineB',
  fontSize: '18px',
  textAlign: 'center',
}));

export default function ResponsiveHeader() {
  const theme = useTheme();
  const isLargeUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [basketCount, setBasketCount] = React.useState(0);
  const { user } = useUser();

  // Load basket count from localStorage on component mount
  React.useEffect(() => {
    const savedCount = localStorage.getItem('basketCount');
    if (savedCount) {
      setBasketCount(parseInt(savedCount));
    } else {
      // If no basketCount in localStorage, calculate from cartProducts
      const cartProducts = localStorage.getItem('cartProducts');
      if (cartProducts) {
        try {
          const products = JSON.parse(cartProducts);
          const totalCount = products.reduce((sum, item) => sum + (item.count || 1), 0);
          setBasketCount(totalCount);
        } catch (error) {
          console.error('Error parsing cart products:', error);
        }
      }
    }
  }, []);

  // Function to update basket count
  const updateBasketCount = (count) => {
    setBasketCount(count);
    localStorage.setItem('basketCount', count.toString());
  };

  // Function to add item to basket
  const addToBasket = () => {
    const newCount = basketCount + 1;
    updateBasketCount(newCount);
  };

  // Function to remove item from basket
  const removeFromBasket = () => {
    if (basketCount > 0) {
      const newCount = basketCount - 1;
      updateBasketCount(newCount);
    }
  };

  // Function to clear basket
  const clearBasket = () => {
    updateBasketCount(0);
  };

  // Expose functions to global scope for other components to use
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addToBasket = addToBasket;
      window.removeFromBasket = removeFromBasket;
      window.clearBasket = clearBasket;
      window.getBasketCount = () => basketCount;
      window.updateBasketCount = updateBasketCount;
    }
  }, [basketCount]);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  if (isLargeUp) {
    return (
      <>
        <HeaderContainer
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: { xs: '160px', sm: '160px', md: '80px', lg: '80px' },
            position: 'relative',
            marginLeft:"10%",
            marginRight:"10%",
          }}
        >
          {/* Left Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>
                {user ? (
                  <Link href="../components/account">
                    <StyledIconButton>
                      <Typography sx={{fontFamily:"mine"}}>حساب کاربری</Typography>
                    </StyledIconButton>
                  </Link>
                ) : (
                  <>
                    <Link href="../components/account">
                      <StyledIconButton>
                      <Typography sx={{fontFamily:"mine"}}>وارد شوید</Typography>
                      </StyledIconButton>
                    </Link>

                    <Typography>|</Typography>
                    <Link href="../components/account/userregister">
                      <StyledIconButton>
                       <Typography sx={{fontFamily:"mine"}}>عضویت</Typography>
                      </StyledIconButton>
                    </Link>
                  </>
                )}
                <Link href="../components/account">
                  <StyledIconButton>
                    <SearchOutlinedIcon />
                  </StyledIconButton>
                </Link>
               
                <Link href="../components/basket">
                  <StyledIconButton>
                    <Badge badgeContent={basketCount} color="error" sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#35b399',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '20px',
                        height: '20px',
                        borderRadius: '10px'
                      }
                    }}>
                      <LocalMallOutlinedIcon />
                    </Badge>
                  </StyledIconButton>
                </Link>
              </Box>

              {/* Logo in the center */}
              <Box
                sx={{
                  position: 'absolute',
                  left: '20%',
                  width: '60%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  top: 0,
                  pointerEvents: 'none',
                }}
              >
                <Link href="/" passHref>
                  <Image src={logo} alt="logo" height={50} width={100} style={{ pointerEvents: 'auto' }} />
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '20%', justifyContent: 'flex-end' }}>
           
            <Typography variant="h6" sx={{ marginLeft: 1,fontFamily:"mine",color:"white",backgroundColor:"#45424e",borderRadius:"10px",paddingLeft:"10px",paddingRight:"10px" }}>۰۲۱۲۲۲۲۲۲۲۲</Typography>
            <PhoneEnabledSharpIcon />
          </Box>
        </HeaderContainer>
        {/* AppBar and navigation menu for lg and above */}
        <AppBar position="static">
          <Toolbar>
            <Box sx={{
              width: '100%',
              justifyContent: "center",
              alignItems: "center",
              display: { xs: 'none', lg: 'flex' },
              direction: 'rtl'
            }}>
              <StyledLink href="../components/ASorbet">سربه لیوانی</StyledLink>
              <StyledLink href="../components/Bicecreamcake">کیک بستنی</StyledLink>
              <StyledLink href="../components/Cfrozenyogurt">ماست بستنی لیوانی</StyledLink>
              <StyledLink href="../components/Dicecream">بستنی رژیمی</StyledLink>
              <StyledLink href="../components/contact">تماس با ما</StyledLink>
            </Box>
          </Toolbar>
        </AppBar>
      </>
    );
  }

  // For md and below: compact header + full-width StyledDrawer with centered logo and close icon
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1,
        width: '100%',
        background: '#fff',
        fontFamily:"mine",
        boxShadow: 1,
      }}
    >
      {/* Left: Basket & Search */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link href="/components/basket">
          <IconButton>
            <Badge badgeContent={basketCount} color="error" sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#35b399',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                minWidth: '20px',
                height: '20px',
                borderRadius: '10px'
              }
            }}>
              <LocalMallOutlinedIcon />
            </Badge>
          </IconButton>
        </Link>
        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>
      </Box>

      {/* Right: Logo & Menu (چسبیده به راست) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
        <Link href="/" passHref>
          <Image src={logo} alt="logo" height={40} width={80} />
        </Link>
        <IconButton onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Full-width Drawer for md and below */}
      {isSmallScreen && (
        <StyledDrawer
          variant="persistent"
          anchor="right"
          open={drawerOpen}
          PaperProps={{
            sx: {
              width: '100%',
              fontFamily:"mine",
  fontSize:"18px",
  textAlign:'center',
             backgroundColor:"white",

            },
          }}
        >
          {/* Top section: Close icon (right), logo (center) */}
          <Box sx={{ backgroundColor:"white",display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', py: 2 }}>
          <IconButton
              onClick={handleDrawerClose}
              sx={{ position: 'absolute', left: 16, top: 8 }}
              aria-label="close drawer"
            >
              <CloseIcon fontSize="medium" />
            </IconButton>
            
            {/* Centered logo */}
            <Box sx={{ mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' ,marginTop:"10%"}}>
            {user ? (
              <Link href="../components/account">
                <StyledIconButton>
                  <Typography sx={{fontFamily:"mine"}}>حساب کاربری</Typography>
                </StyledIconButton>
              </Link>
            ) : (
              <>
                <Link href="../components/account">
                  <StyledIconButton>
                  <Typography sx={{fontFamily:"mine"}}>وارد شوید</Typography>
                  </StyledIconButton>
                </Link>

                <Typography>|</Typography>
                <Link href="../components/account">
                  <StyledIconButton>
                   <Typography sx={{fontFamily:"mine"}}>عضویت</Typography>
                  </StyledIconButton>
                </Link>
              </>
            )}
            </Box>
            {/* Close icon at top right */}
           
          </Box>
          <Divider />
          <Box sx={{width:"100%", backgroundColor:"#f9f9f9", mx: 'auto',display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: "center", fontFamily: "mineB", fontSize: "18px" }}>
          <List>
            <ListItem disablePadding>
              <StyledListItemButton component="a" href="../components/ASorbet" sx={{ justifyContent: 'center' }}>
                <Typography sx={{ fontFamily: "mineB", textAlign: "center",marginTop:"10%" }}>سربه لیوانی</Typography>
              </StyledListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <StyledListItemButton component="a" href="../components/Bicecreamcake" sx={{ justifyContent: 'center' }}>
                <Typography sx={{ fontFamily: "mineB", textAlign: "center",marginTop:"10%" }}>کیک بستنی</Typography>
              </StyledListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <StyledListItemButton component="a" href="../components/Cfrozenyogurt" sx={{ justifyContent: 'center' }}>
                <Typography sx={{ fontFamily: "mineB", textAlign: "center",marginTop:"10%" }}>ماست بستنی لیوانی</Typography>
              </StyledListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <StyledListItemButton component="a" href="../components/Dicecream" sx={{ justifyContent: 'center' }}>
                <Typography sx={{ fontFamily: "mineB", textAlign: "center" ,marginTop:"10%"}}>بستنی رژیمی</Typography>
              </StyledListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <StyledListItemButton component="a" href="../components/contact" sx={{ justifyContent: 'center' }}>
                <Typography sx={{ fontFamily: "mineB", textAlign: "center",marginTop:"10%" }}>تماس با ما</Typography>
              </StyledListItemButton>
            </ListItem>
          </List>
          </Box>
        </StyledDrawer>
      )}
    </Box>
  );
}


























