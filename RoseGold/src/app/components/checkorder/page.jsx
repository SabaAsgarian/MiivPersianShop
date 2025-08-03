"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress
} from '@mui/material';
import Header from '../header';
import Footer from '../footer';

export default function CheckOrder() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const cartData = localStorage.getItem('cart');

    if (!userData || !cartData) {
      router.push('/components/basket');
      return;
    }

    try {
      setUser(JSON.parse(userData));
      const parsedCart = JSON.parse(cartData);
      setCartItems(parsedCart.items);
      setTotalAmount(parsedCart.totalAmount);
      setLoading(false);
    } catch (error) {
      console.error('Error parsing data:', error);
      router.push('/components/basket');
    }
  }, [router]);

  const handleConfirmOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/components/account/userlogin');
        return;
      }

      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          img: item.img
        })),
        totalAmount: totalAmount,
        shippingAddress: {
          city: user.city,
          street: user.street
        }
      };

      const response = await fetch('https://miivpersianshop.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok) {
        const trackingCode = Math.random().toString(36).substring(2, 15).toUpperCase();
        const orderToStore = {
          ...data.order,
          totalAmount: totalAmount,
          trackingCode: trackingCode
        };
        localStorage.setItem('lastOrder', JSON.stringify(orderToStore));
        localStorage.removeItem('cart');

        setTimeout(() => {
          window.location.href = '/components/payment';
        }, 100);
      } else {
        throw new Error(data.error || 'Error placing order');
      }
    } catch (error) {
      console.error('Error during order confirmation:', error);
      alert(error.message || 'Error placing order. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <div>
      <Header />
      <Container maxWidth="md" sx={{ py: 4, direction: "rtl" }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontFamily: "mineB", fontSize: "22px" }}>
            ثبت نهایی سفارش
          </Typography>

          {/* اطلاعات کاربر */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: "mine", fontSize: "20px" }}>
              اطلاعات گیرنده :
            </Typography>
            <Typography sx={{ fontFamily: "mine", fontSize: "14px" }}>نام و نام خانوادگی: {user.fname} {user.lname}</Typography>
            <Typography sx={{ fontFamily: "mine", fontSize: "14px" }}>آدرس ارسال بار: {user.city}، {user.street}</Typography>
            <Typography sx={{ fontFamily: "mine", fontSize: "14px" }}>شماره موبایل: {user.mobile}</Typography>
          </Box>

          {/* لیست محصولات */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontFamily: "mine", fontSize: "14px" }}>محصول</TableCell>
                  <TableCell align="center" sx={{ fontFamily: "mine", fontSize: "14px" }}>تعداد</TableCell>
                  <TableCell align="center" sx={{ fontFamily: "mine", fontSize: "14px" }}>قیمت</TableCell>
                  <TableCell align="center" sx={{ fontFamily: "mine", fontSize: "14px" }}>قیمت کل</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                        <img
                          src={`https://miivpersianshop.onrender.com/${item.img}`}
                          alt={item.name}
                          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                        />
                        <Typography sx={{ fontFamily: "mine", fontSize: "14px" }}>{item.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "mine", fontSize: "14px" }}>{item.quantity}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: "mine", fontSize: "14px" }}>{item.price} تومان</TableCell>
                    <TableCell align="center" sx={{ fontFamily: "mine", fontSize: "14px" }}>
                      {(item.price * item.quantity)} تومان
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <strong style={{ fontFamily: "mineB", fontSize: "14px" }}>قیمت کل</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong style={{ fontFamily: "mineB", fontSize: "14px" }}>{totalAmount} تومان</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>


          {/* دکمه‌ها */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
             
              onClick={() => router.push('/components/basket')}
              sx={{ fontFamily: "mine", backgroundColor: "white",
                color: "#35b399",
               fontFamily:"mine",
                height: "50px",
                width: "200px",
                boxShadow:"0 3px 6px rgba(0,0,0,0.15),0 1px 3px rgba(0,0,0,0.11)" }}
            >
              بازگشت به سبد خرید
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmOrder}
              sx={{ fontFamily: "mine",backgroundColor:"#35b399",fontFamily:"mine", '&:hover': {
                            backgroundColor: '#35b399',
                        } }}
            >
              پرداخت و تکمیل سفارش
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}
