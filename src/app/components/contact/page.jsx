"use client"
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import PrimarySearchAppBar from '../header'; // Adjust the path as necessary
import MultiActionAreaCard from '../card'; // Updated import to use MultiActionAreaCard
import ring from '../img/ring.jpg'
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
import Link from 'next/link';
const CustomListItem = styled(ListItem)(({ theme }) => ({
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
  const res = await fetch('https://miivpersianshop.onrender.com/api/category/icecreamcake', {
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
        تماس با ما
        </Typography>
      </Box>
    
     
      <Box sx={{ direction: "rtl", width: '90%' }}>

          <Typography sx={{ fontFamily: "mineB", fontSize: "20px" }}>
             با صبا عسگریان در تماس باشید

          </Typography>
        <List>
           <CustomListItem>
                      <Typography variant="body1" sx={{marginRight: 1, fontFamily: "mineB", fontSize: "16px" }}>
                      ایمیل : 
                      </Typography>
                         <Link href='mailto:sabaasgariandev@gmail.com'>
                      <Typography variant="body2" sx={{ marginRight: 1, fontFamily: "mine", fontSize: "16px" }}>
                        sabaasgariandev@gmail.com
                      </Typography>
                      </Link>
                    </CustomListItem>
           <CustomListItem>
                      <Typography variant="body1" sx={{marginRight: 1, fontFamily: "mineB", fontSize: "16px" }}>
                      سایت شخصی  : 
                      </Typography>
                      <Link href="https://sabaasgarian.site/" target='_blank'>
                      <Typography variant="body2" sx={{ marginRight: 1, fontFamily: "mine", fontSize: "16px" }}>
                       https://sabaasgarian.site
                      </Typography>
                      </Link>
                    </CustomListItem>
           
            
          
        </List>
      </Box>

      
      <Footer/>
    </div>
  );
};

export default RingsPage;

