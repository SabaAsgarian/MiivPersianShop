"use client"
import React, { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import Image from 'next/image'
import Slider from './components/slider'
import rin from './components/img/1b267619c4812cc46ee281747884ca50 (1).jpg'
import nec from './components/img/1b267619c4812cc46ee281747884ca50 (2).jpg'
import brac from './components/img/1b267619c4812cc46ee281747884ca50 (3).jpg'
import eari from './components/img/1b267619c4812cc46ee281747884ca50 (4).jpg'
import PrimarySearchAppBar from './components/header'
import left from './components/img/homeleft.jpg'
import right from './components/img/homeright.jpg'
import Swiper from './components/swiper'
import last from './components/img/last.webp'
import AssignmentReturnedOutlinedIcon from '@mui/icons-material/AssignmentReturnedOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import Footer from './components/footer'
import Swiperbranches from './components/swiperbranches';
import CardBlog from "./components/cardBlog";
import CardComment from "./components/cardcomment";
const cardDatafirst = [
  { title: 'نحوه ارسال و سرعت در ارسال واقعا عالی بود و باید آفرین گفت بهشون     ', description: 'مژده مهدوی      ' },
  { title: ' من معتاد کیک بستنی های شما هستم و بس', description: 'سعید محمدی      ' },
  { title: 'مزه اش با همه ی بستنی هایی که خوردم فرق داره و بسته بندی فوق العاده زیبا و شکیل داره ', description: 'مهدی اردلان      ' },
  { title: ' یه ایده جذاب و باحال برای کادو و دورهمی ها و مهمونی ها', description: 'امیر حسین احمدی      ' },
 

];
export default function Page() {
  const [showVideo, setShowVideo] = useState(false);

  const handleGifError = () => {
    setShowVideo(true);
  };

  return (
    <>
      <PrimarySearchAppBar />
      <Box sx={{ width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#ffffff", fontFamily: "mine" }}>
        <Box sx={{ width: '100%', height: '100%' }}>

          <Slider />

        </Box>

        {/* Grid for images */}
        <Grid container spacing={0} sx={{ marginTop: "5%", marginBottom: "5%", width: "80%" }}>
          {/* Ring */}
          <Grid item xs={6} md={3} lg={3} xl={3}>
            <Link href="./components/Bicecreamcake" passHref>
              <Box
                sx={{
                  height: '20vh', // Half the viewport height
                  cursor: 'pointer',
                  margin: "5%",
                  borderRadius: "10px",
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    '& .image-container': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.3s ease'
                    },
                    '& .caption': {

                      transition: 'all 0.3s ease'
                    }
                  }
                }}
              >
                <Box
                  className="image-container"
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <Image
                    src={rin}
                    alt="Rings"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>

                <Box
                  className="caption"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '10px 20px',
                    fontSize: "20px",
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: "center",
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  کیک بستنی
                </Box>
              </Box>
            </Link>
          </Grid>
          {/* Necklace */}
          <Grid item xs={6} md={3} lg={3} xl={3}>
            <Link href="./components/Dicecream" passHref>
              <Box
                sx={{
                  height: '20vh', // Half the viewport height
                  cursor: 'pointer',
                  margin: "5%",
                  borderRadius: "10px",
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    '& .image-container': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.3s ease'
                    },
                    '& .caption': {

                      transition: 'all 0.3s ease'
                    }
                  }
                }}
              >
                <Box
                  className="image-container"
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <Image
                    src={nec}
                    alt="necklace"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>

                <Box
                  className="caption"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '10px 20px',
                    fontSize: "20px",
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: "center",

                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  بستنی رژیمی
                </Box>
              </Box>
            </Link>
          </Grid>
          {/* Bracelet */}
          <Grid item xs={6} md={3} lg={3} xl={3}>
            <Link href="./components/Cfrozenyogurt" passHref>
              <Box
                sx={{
                  height: '20vh', // Half the viewport height
                  cursor: 'pointer',
                  margin: "5%",
                  borderRadius: "10px",
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    '& .image-container': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.3s ease'
                    },
                    '& .caption': {

                      transition: 'all 0.3s ease'
                    }
                  }
                }}
              >
                <Box
                  className="image-container"
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <Image
                    src={brac}
                    alt="bracelet"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>

                <Box
                  className="caption"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',

                    fontSize: "18px",
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: "center",
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ماست بستنی لیوانی
                </Box>
              </Box>
            </Link>
          </Grid>
          {/* Earrings */}
          <Grid item xs={6} md={3} lg={3} xl={3}>
            <Link href="./components/ASorbet" passHref>
              <Box
                sx={{
                  height: '20vh', // Half the viewport height
                  cursor: 'pointer',
                  margin: "5%",
                  borderRadius: "10px",
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    '& .image-container': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.3s ease'
                    },
                    '& .caption': {


                      transition: 'all 0.3s ease'
                    }
                  }
                }}
              >
                <Box
                  className="image-container"
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <Image
                    src={eari}
                    alt="Earrings"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>

                <Box
                  className="caption"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '10px 20px',

                    color: 'white',
                    fontSize: "20px",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: "center",
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  سربه لیوانی
                </Box>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: "100%", direction: "rtl", display: "flex", flexDirection: "column", alignItems: "center", mt: "1%" }}>

        {/* عنوان - کاملاً سمت راست */}
        <Box sx={{ width: "88%", alignSelf: "flex-end" }}>
          <Box sx={{ width: '80px', height: '2px', backgroundColor: 'black',mb: 1 }} />
          <Box sx={{ fontWeight: 'bold', color: 'black', fontSize: '25px' }}>
            جدیدترین ها
          </Box>
        </Box>

        {/* Swiper - وسط */}
        <Box sx={{ width: "88%", mb: "3%", mx: "auto", minHeight: "50vh" }}>
          <Swiper />
        </Box>
      </Box>
      {/* g//////////////////////////////////////////////////////// */}



      {/* last */}
      <Box sx={{ width: "100%", direction: "rtl", display: "flex", flexDirection: "column", alignItems: "center", mt: "1%" }}>

        {/* عنوان - کاملاً سمت راست */}
        <Box sx={{ width: "88%", alignSelf: "flex-end" }}>
          <Box sx={{ width: '80px', height: '2px', backgroundColor: 'black',mb: 1 }} />
          <Box sx={{ fontWeight: 'bold', color: 'black', fontSize: '25px' }}>
            پرفروش ترین ها
          </Box>
        </Box>

        {/* Swiper - وسط */}
        <Box sx={{ width: "88%", mb: "5%", mx: "auto", minHeight: "50vh" }}>
          <Swiperbranches />
        </Box>
      </Box>
      {/* f///////////////////last///////////////////////////// */}

      <Box sx={{ width: "100%", direction: "rtl", display: "flex", flexDirection: "column", alignItems: "center",minHeight:"60vh",maxHeight:"auto" }}>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1, // space between line and heading
            marginBottom: 4,
            
          }}
        >
          {/* Line */}
          <Box sx={{ width: '80px', height: '2px', backgroundColor: 'black' }} />

          {/* Heading */}
          <Typography align="center" sx={{ fontFamily: "mineB", fontSize: "25px" }}>
            مطالب وبلاگ
          </Typography>
        </Box>
        <Box sx={{ width: "90%", alignSelf: 'flex-end', mr: 4 }}>
          <CardBlog />
        </Box>
      </Box>
      <Box sx={{ width: "100%", direction: "rtl", display: "flex", flexDirection: "column", alignItems: "center", mt: "1%" }}>

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
          <Typography align="center" sx={{ fontFamily: "mineB", fontSize: "25px" }}>
            نظرات مشتریان
          </Typography>
        </Box>
           <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', height: 'auto', direction: 'rtl' }} >
        {cardDatafirst.map((card, index) => (
          <CardComment key={index} image={card.image} title={card.title} description={card.description} />
        ))}
      </Box>
      </Box>
      <Footer />
    </>
  )
}
