"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Header from '../header';
import Footer from '../footer';
import CustomizedBreadcrumbs from '../bradcrumbs';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../cartSlice';

export default function ThankYou() {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Thank you page mounted');
    const orderData = localStorage.getItem('lastOrder');
    console.log('Retrieved from localStorage:', orderData);
    
    if (orderData) {
      try {
        const parsedOrder = JSON.parse(orderData);
        console.log('Parsed order data:', parsedOrder);
        setOrder(parsedOrder);
        
        // Clear cart after successful order
        dispatch(clearCart());
        
        // Clear order data from localStorage
        localStorage.removeItem('lastOrder');
        
        console.log('Cart cleared after successful order');
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }
  }, [dispatch]);

  const handleViewOrders = () => {
    window.location.href = '/components/account';
  };

  const handleReturnHome = () => {
    window.location.href = '/';
  };

  return (
   <div>
    <Header/>
    
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: '#35b399', mb: 2 }} />
        
        <Typography variant="h5" gutterBottom sx={{fontFamily:"mineB",fontSize:"16px"}}>
          سفارش‌تان با موفقیت در سیستم ثبت گردید
        </Typography>

        {order && order.trackingCode ? (
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom sx={{fontFamily:"mine",fontSize:"15px"}}>
              جزئیات سفارش
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'background.paper', 
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              mb: 2
            }}>
              <Typography variant="body1" gutterBottom sx={{fontFamily:"mine",fontSize:"14px"}}>
                مبلغ کل : {order.totalAmount} تومان
              </Typography>
              <Typography variant="body1" sx={{ fontFamily:"mineB",fontSize:"14px", color: '#35b399' }}>
         {order.trackingCode}       :  کد پیگیری سفارش 
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{fontFamily:"mine",fontSize:"13px"}}>
              .لطفاً کد رهگیری خود را برای مراجعات بعدی ذخیره کنید
            </Typography>
          </Box>
        ) : (
          <Box sx={{ my: 3 }}>
            <Typography color="error" variant="h6" gutterBottom sx={{fontFamily:"mine",fontSize:"15px"}}>
             جزئیات سفارش در دسترس نیست
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
           
            onClick={handleViewOrders}
            sx={{color:"white",backgroundColor:"#35b399",fontFamily:"mine", '&:hover': {
                            backgroundColor: '#35b399',
                        }}}
          >
            مشاهده سفارش ها 
          </Button>
          <Button
           
            onClick={handleReturnHome}
            sx={{ backgroundColor: "white",
                color: "#35b399",
               fontFamily:"mine",
                height: "50px",
                width: "200px",
                boxShadow:"0 3px 6px rgba(0,0,0,0.15),0 1px 3px rgba(0,0,0,0.11)"}}
          >
            بازگشت به صفحه اصلی 
          </Button>
        </Box>
      </Paper>
    </Container>
    <Footer/>
    </div>
  );
} 