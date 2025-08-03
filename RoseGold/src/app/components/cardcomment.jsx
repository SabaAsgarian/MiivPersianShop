import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import '../globals.css';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
const CustomCard = ({ title, description }) => {
  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '100%', md: '20%' },
        margin: '10px',
        direction: 'rtl',
        height: '350px',
        maxHeight: '400px',
        boxShadow:"none",
        border:"1px solid #E4E4E4"
      }}
      className="my-10 page2"
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {/* Top Section: Icon + Title */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box
  sx={{
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  }}
>
  {/* دایره کوچک با متن */}
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: '#35b399',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '10px',
      color: 'white',
      padding: '2px',
      textAlign: 'center',
      zIndex: 100
    }}
  >
    <FormatQuoteIcon/>
  </Box>

  {/* دایره اصلی */}
  <Box
    sx={{
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#35b399',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    }}
  >
    <PersonOutlineIcon sx={{ fontSize: '20px', color: 'white' }} />
  </Box>
</Box>


          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              fontFamily: 'mine',
              fontSize: '16px',
              color: '#45424e',
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Bottom Section: Description */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            marginTop: 'auto',
          }}
        >
          <Box sx={{ width: '80px', height: '2px', backgroundColor: '#35b399' }} />
          <Typography
            component="div"
            sx={{
              textAlign: 'center',
              fontFamily: 'mineB',
              marginTop: '10px',
              fontSize: '16px',
              color: '#35b399',
            }}
          >
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
