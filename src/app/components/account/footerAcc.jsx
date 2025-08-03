"use client"
import { Box } from "@mui/material"
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import React from 'react';
import Image from "next/image";
import Typography from "@mui/material/Typography";
import AssignmentReturnedOutlinedIcon from '@mui/icons-material/AssignmentReturnedOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import Me from '../img/me.png'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import Link from "next/link";
import '../styles.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#f9f9f9',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    color: theme.palette.text.secondary,
    boxShadow: 'none', // {{ edit_1 }} Remove box shadow
    ...theme.applyStyles('dark', {
        backgroundColor: '#f9f9f9',
    }),
}));

export default function footer() {
    return (
        <>
            <Box sx={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'start', alignItems: 'start', backgroundColor: 'white', marginTop: '10%', color: 'black' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%',   marginTop:'5%' }}> {/* Changed to column */}
              
         

                 

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 3, sm: 2, md: 4 ,lg:10}}
                        sx={{width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:"#f9f9f9", borderTop: '1px solid #ececec',
                            borderBottom: '1px solid #ececec',minHeight:"70px",maxHeight:"auto",}}
                    >
                        <Item><a href="#link1" style={{ color: 'black', textDecoration: 'none', textAlign: 'center' }}>
                            <h1 style={{fontFamily:"mine",fontSize:"18px",}}>حریم خصوصی</h1>

                            


                        </a></Item>
                        <Item><a href="#link1" style={{ color: 'black', textDecoration: 'none', textAlign: 'center' }}>
                            <h1 style={{fontFamily:"mine",fontSize:"18px"}}>درباره بستنی میو</h1>

                    


                        </a></Item>
                        <Item><a href="#link1" style={{ color: 'black', textDecoration: 'none', textAlign: 'center' }}>
                            <h1 style={{fontFamily:"mine",fontSize:"18px"}}>تماس با ما</h1>

                           


                        </a></Item>
                        <Item><a href="#link1" style={{ color: 'black', textDecoration: 'none', textAlign: 'center' }}>
                            <h1 style={{fontFamily:"mine",fontSize:"18px"}}>بلاگ</h1>

                           


                        </a></Item>
                    </Stack>
                    <Box sx={{ width: '100%', my: '5%' }}>
                        <Stack spacing={2}  sx={{width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:"white",}}>
                            <Item sx={{backgroundColor:"white"}}>
                                <Image src={Me} alt="me" width={100} height={100} style={{borderRadius:'50%' ,backgroundColor:'#35b399'}} />
                                <Typography variant="body1" sx={{ marginTop: 1 }}>۱۴۰۴ - کلیه حقوق این فروشگاه برای صبا عسگریان محفوظ است</Typography>
                              <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:"white"}}>
                              <Link href='https://www.instagram.com/saba_asgarian_web?igsh=M2Z2dTU3cHFmeW1o&utm_source=qr'>
                                    <InstagramIcon sx={{ color: 'black', ml: '2%' }} /> {/* Set color here */}
                                </Link>
                                <Link href='https://www.linkedin.com/in/saba-asgarian-69161088?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'>
                                    <LinkedInIcon sx={{ color: 'black', ml: '2%' }} /> {/* Set color here */}
                                </Link>
                                <Link href='https://github.com/SabaAsgarian'>
                                    <GitHubIcon sx={{ color: 'black', ml: '2%' }} /> {/* Set color here */}
                                </Link>
                                <Link href='mailto:computer.sabaa@gmail.co'>
                                    <MailIcon sx={{ color: 'black', ml: '2%' }} /> {/* Set color here */}
                                </Link>
                              </Box>
                            </Item>
                        </Stack>
                    </Box>

                </Box>
            </Box>
        </>
    )
}