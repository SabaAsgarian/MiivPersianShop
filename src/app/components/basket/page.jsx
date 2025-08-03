"use client";
import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../header";
import { useSelector, useDispatch } from 'react-redux';
import {
  plusFromCart,
  minusFromCart,
  totalPrice,
} from '../../cartSlice';
import { useRouter } from "next/navigation";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PaymentIcon from "@mui/icons-material/Payment";
import Image from "next/image";
import load from "../img/load.gif";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { Box, CircularProgress, Typography } from "@mui/material";
import CustomizedBreadcrumbs from "./../bradcrumbs";
import NestedModal from "./../modal"; // مدال ورود

const PayButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: "darkgray",
  },
});

export default function CartPage() {
  const [windowWidth, setWindowWidth] = useState(0);
  // Use Redux hooks instead of Zustand
  const products = useSelector(state => state.cart.products);
  const num = useSelector(state => state.cart.num);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false); // مدیریت لودینگ سفارش
  const [orderSuccess, setOrderSuccess] = useState(false); // پیام موفقیت
  const [showLoginModal, setShowLoginModal] = useState(false); // مدیریت نمایش مدال ورود
  const router = useRouter(); // در بالای کامپوننت تعریف کنید


  useEffect(() => {
    
    setIsClient(true);
    dispatch(totalPrice()); // Calculate total price using Redux action

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [products, dispatch]); // Recalculate when products change

  if (!isClient) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width:'100%', 
          height:'80vh'
        }}
      >
        <Box sx={{fontSize:'50px',display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',}}>
        <p>بارگذاری...</p>
        <CircularProgress color="#4faeb1" />
        </Box>
      </Box>
    );
  }
  

  const handlePlaceOrder = () => {
    const userData = localStorage.getItem('user');
    
    if (!userData) {
      // اگر کاربر لاگین نکرده باشه
      const currentPath = '/components/basket';
      localStorage.setItem('redirectAfterLogin', currentPath);
      router.push('/components/account/userlogin');
      return;
    }

    // ذخیره اطلاعات سبد خرید در localStorage
    const cartData = {
      items: products.map(item => ({
        id: item._id,
        name: item.title,
        price: item.price,
        quantity: item.count,
        img: item.img
      })),
      totalAmount: num
    };
    
    localStorage.setItem('cart', JSON.stringify(cartData));
    router.push('/components/checkorder');
  };

  return (
    <>
      <PrimarySearchAppBar />
      
    
      <TableContainer
        component={Paper}
        sx={{
          direction: "rtl",
          p: 2,
          mt: 4,
          mb: 8,
          mx: "auto",
          maxWidth: "1000px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          borderRadius: 2,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={7}>
                <Typography variant="h6" sx={{fontFamily:"mineB",fontSize:"20px"}}>سبد خرید</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" sx={{fontFamily:"mine",fontSize:"16px"}}>محصول</TableCell>
              <TableCell align="center" sx={{fontFamily:"mine",fontSize:"16px"}}>عنوان</TableCell>
              <TableCell align="center" sx={{fontFamily:"mine",fontSize:"16px"}}>قیمت واحد</TableCell>
              <TableCell align="center" sx={{fontFamily:"mine",fontSize:"16px"}}>تعداد</TableCell>
              <TableCell align="center" sx={{fontFamily:"mine",fontSize:"16px"}}>افزودن</TableCell>
              <TableCell align="center" sx={{fontFamily:"mine",fontSize:"16px"}}>کاهش</TableCell>
              <TableCell align="center" sx={{fontFamily:"mine",fontSize:"16px"}}>قیمت کل</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((val) => (
              <TableRow key={val.id}>
                <TableCell align="center">
                  <img
                    src={`https://miivpersianshop.onrender.com/${val.img}`}
                    alt={val.title}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{fontFamily:"mine",fontSize:"14px"}}>{val.title}</Typography>
                </TableCell>
                <TableCell align="center" sx={{fontFamily:"mine",fontSize:"14px"}}>{val.price} تومان</TableCell>
                <TableCell align="center" sx={{fontFamily:"mine",fontSize:"14px"}}>{val.count}</TableCell>
                <TableCell align="center" sx={{fontFamily:"mine",fontSize:"14px"}}>
                  <Button
                    onClick={() => {
                      dispatch(plusFromCart(val.id));
                      dispatch(totalPrice());
                    }}
                    variant="text"
                  >
                    <AddCircleOutlineIcon sx={{color:"#35b399"}} />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      dispatch(minusFromCart(val.id));
                      dispatch(totalPrice());
                    }}
                    variant="text"
                  >
                    <RemoveCircleOutlineIcon sx={{color:"#35b399"}} />
                  </Button>
                </TableCell>
                <TableCell align="center" sx={{fontFamily:"mine",fontSize:"14px"}}>{val.price * val.count} تومان</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography
          sx={{ mt: 3, fontWeight: "bold", fontSize: "18px", textAlign: "center", fontFamily:"mine" }}
        >
          جمع کل سبد خرید: {num} تومان
        </Typography>

        {/* دکمه‌ها: یکی راست، یکی چپ */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Link href="/">
            <Button
              sx={{
                backgroundColor: "white",
                color: "#35b399",
               fontFamily:"mine",
                height: "50px",
                width: "200px",
                boxShadow:"0 3px 6px rgba(0,0,0,0.15),0 1px 3px rgba(0,0,0,0.11)"
              }}
            >
                <ChevronRightIcon sx={{color:"#35b399"}}/>
              بازگشت 
            
            </Button>
          </Link>

          <PayButton
            onClick={handlePlaceOrder}
            disabled={loading}
            sx={{ height: "50px", width: "200px",backgroundColor:"#35b399",fontFamily:"mine", '&:hover': {
                            backgroundColor: '#35b399',
                        }, }}
          >
            {loading ? "در حال پردازش..." : "ثبت سفارش"}
            <PaymentIcon sx={{ mr: 1 }} />
          </PayButton>
        </Box>
      </TableContainer>

      {showLoginModal && <NestedModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
}
