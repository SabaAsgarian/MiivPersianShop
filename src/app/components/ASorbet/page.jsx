"use client"
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import PrimarySearchAppBar from '../header'; // Adjust the path as necessary
import MultiActionAreaCard from '../card'; // Updated import to use MultiActionAreaCard

import Image from 'next/image';
import  useStore  from '../../store' ;
import Footer from '../footer'
import CustomizedBreadcrumbs from '../bradcrumbs'
import { Box, CircularProgress, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../cartSlice';
import { List, ListItem } from '@mui/material';
import { styled } from '@mui/system';
const CustomListItem = styled(ListItem)(({ theme }) => ({
   textAlign:"start",
  position: 'relative',
  marginTop: '1%',
  marginBottom: "1%"
  ,
  paddingLeft: theme.spacing(3),
  '&::before': {
    content: '"•"',
    position: 'absolute',
    right: theme.spacing(1),
    color: '#35b399',
    fontSize: '1.2rem',
  },
}));
async function getData() {
  const res = await fetch('https://miivpersianshop.onrender.com/api/category/sorbet', {
    next: { revalidate: 60 } // Next.js ISR
  });
  if (!res.ok) throw new Error('Failed to fetch data: ' + res.statusText);
  return res.json();
}
const RingsPage = () => {
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to hold error message
  const [windowWidth, setWindowWidth] = useState(0); // Initialize to 0 or a default value
  // Use Redux dispatch for cart actions
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();

    // Update window width on client
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial width

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth); // Set window width only on the client
    }
  }, []);

 

  return (
    <div>
      <PrimarySearchAppBar />
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1, // space between line and heading
          marginBottom: 4,
          marginTop: 6
        }}
      >
        {/* Line */}
        <Box sx={{ width: '80px', height: '2px', backgroundColor: 'black' }} />

        {/* Heading */}
        <Typography align="center" sx={{ fontFamily: "mineB", fontSize: "22px" }}>
          سربه لیوانی
        </Typography>
      </Box>
    
     
      <Box sx={{ direction: "rtl", width: '90%' }}>

          <Typography sx={{ fontFamily: "mineB", fontSize: "16px" }}>
            
         سُربه (Sorbet) چیه؟

          </Typography>
        <List>
          <CustomListItem>
           
            <Typography variant="body2" sx={{ marginRight: 1, fontFamily: "mine", fontSize: "16px" }}>
         یه دسر یخی میوه‌ای، بدون لبنیات که %70 درصد از میوه های ارگانیک و %30 از آب معدنی درست شده
            </Typography>
          </CustomListItem>
          <CustomListItem>
            
            <Typography variant="body2" sx={{ marginRight: 1, fontFamily: "mine", fontSize: "16px" }}>
             کاملاً وگان و فاقد لاکتوز و گلوتن
            </Typography>
          </CustomListItem>
          <CustomListItem>
            
            <Typography variant="body2" sx={{ marginRight: 1, fontFamily: "mine", fontSize: "16px" }}>
             در سربه ها هیچ‌گونه شیر، خامه یا تخم‌مرغ استفاده نمی‌شود
            </Typography>
          </CustomListItem>
          <CustomListItem>
            
            <Typography variant="body2" sx={{ marginRight: 1, fontFamily: "mine", fontSize: "16px" }}>
             سبک، خنک و با طعم طبیعی میوه
            </Typography>
          </CustomListItem>
          <CustomListItem>
            
            <Typography variant="body2" sx={{ marginRight: 1, fontFamily: "mine", fontSize: "16px" }}>
             مناسب برای رژیم‌های خاص و روزهای گرم
            </Typography>
          </CustomListItem>
          
        </List>
      </Box>

      <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1, // space between line and heading
                marginBottom: 4,
                marginTop: 6
              }}
            >
              {/* Line */}
              <Box sx={{ width: '80px', height: '2px', backgroundColor: 'black' }} />
      
              {/* Heading */}
              <Typography align="center" sx={{ fontFamily: "mineB", fontSize: "22px" }}>
                دسته‌بندی سربه لیوانی
              </Typography>
            </Box>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: windowWidth < 600 ? '75%' : windowWidth < 1024 ? '90%' : '75%',
        margin: '5% auto'
      }}>
        {loading ? (
           Array.from(new Array(12)).map((_, index) => (
            <div key={index} style={{ margin: '30px',  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Skeleton variant="rectangular" width={300} height={300}  />
         
              <Box sx={{ width: 290,backgroundColor: 'white',height : 100 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
              <Skeleton variant="rectangular" width={290} height={40} sx={{ borderRadius: '0px', marginBottom: '10px' }} />
            </div>
          ))
        ) : error ? (
          <p>Error: {error}</p>
        ) : data.length > 0 ? (
          data.map(item => (
            <div key={item.id} style={{
              flex: windowWidth < 600 ? '1 0 100%' : windowWidth < 1024 ? '1 0 50%' : '1 0 33.33%',
              marginBottom: '5%',
              padding: '10px' ,
              display:'flex',
              justifyContent:'center',
              alignItems:'center'
            }}>
              <MultiActionAreaCard data={item} />
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default RingsPage;

