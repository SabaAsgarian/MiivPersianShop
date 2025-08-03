"use client"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'; // استفاده از IconButton به جای Button
import CardActionArea from '@mui/material/CardActionArea';
import AddIcon from '@mui/icons-material/Add';
import myContext from '../myContext';
import { useDispatch } from 'react-redux';
import { addProduct } from '../cartSlice';
import '../globals.css'

export default function MultiActionAreaCard({ data }) {
    const temp = {
        id: data._id,
        img: data.img,
        title: data.title,
        price: data.price,
        count: 1
    }
    const dispatch = useDispatch();

    return (
        <myContext.Provider value={data} key={'post' + data._id}>
            <Card sx={{
                width: "250px",
                minHeight: "400px",
                maxHeight: "auto",
                fontFamily: "mine",
                direction: "rtl",
                boxShadow: "none",
                borderRadius: "0px",
                position: 'relative' // اضافه کردن position: 'relative' به Card
            }}>
                <CardActionArea>
                    <div style={{ backgroundColor: 'white', mixBlendMode: 'multiply', position: 'relative' }}>
                        {/* آیکون + در بالا و سمت چپ */}
                        <IconButton
                            onClick={() => dispatch(addProduct(temp))}
                            aria-label="افزودن به سبد خرید"
                            sx={{
                                position: 'absolute',
                                top: 8,
                                left: 8,
                                color: 'white', // رنگ آیکون
                                zIndex: 1, // برای اینکه آیکون روی تصویر قرار بگیره
                                width: "50px",
                                height: "30px",
                                borderRadius: "10px",
                                backgroundColor: "#35b399",
                                '&:hover': {
                                 
                                    backgroundColor: '#3ecf8e',
                                },
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                        <CardMedia
                            component="img"
                            image={`https://miivpersianshop.onrender.com/uploads/${data.img.replace(/^uploads[\\/]/, '')}`}
                            alt={data.category}
                            style={{ backgroundColor: '#faf7f1', mixBlendMode: 'multiply', height: '250px', width: "250px" }}
                            className='secondd'
                            loading="lazy"
                        />
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: "mine",fontSize:"16px",color:"#45424e",textAlign:"center" }}>
                            {data.title}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: "mineB",fontSize:"16px",color:"",textAlign:"center" }}>
                            قیمت : {data.price} تومان
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </myContext.Provider>
    );
}