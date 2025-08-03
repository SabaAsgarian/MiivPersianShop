"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Image from 'next/image';
import Blog from "./img/blog.jpg"
import { Box } from '@mui/material';
export default function ActionAreaCard() {
  return (
    <Card  sx={{width:"350px",borderRadius:"0px",boxShadow:"0 10px 30px rgba(50,50,93,0.12),0 -1px 4px rgba(0,0,0,0.06)"}}>
      <CardActionArea>
        <Box sx={{width:"350px" ,height:"200px"}}>
          <Image src={Blog} alt='blog' style={{height:"100%",width:"100%",objectFit:"cover"}}/>
        </Box>
        <CardContent>
          <Typography gutterBottom  component="div" sx={{transition:".2s",fontFamily:"mineB",fontSize:"16px",'&:hover': {
    color: '#35b399',
    
  },}}>
            فواید و خواص شگفت‌انگیز بستنی
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' ,marginBottom:"10%",marginTop:"5%",fontFamily:"mine",fontSize:"14px",color:"#757181"}}>
             دوشنبه، ۵ آبان ۱۳۹۹
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}