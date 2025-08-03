"use client"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import myContext from '../myContext'; // If you still need this context
import { useDispatch } from 'react-redux';
import { addProduct } from '../cartSlice';
import '../globals.css'
export default function MultiActionAreaCard({ data }) { // Accept data as a prop
    const temp = {
        id: data._id,
        img: data.img,
        title: data.title,
        price: data.price,
        count: 1
    }
    // Use Redux dispatch instead of Zustand
    const dispatch = useDispatch();
    return (
        <myContext.Provider value={data} key={'post' + data._id}>
            <Card sx={{width:"250px",minHeight:"400px",maxHeight:"auto", fontFamily: "mine",direction:"rtl",boxShadow:"none",borderRadius:"0px"}}>
                <CardActionArea>
                    <div style={{ backgroundColor: 'white' ,mixBlendMode:'multiply'}} >
                        <CardMedia
                            component="img"
                            image={`https://miivpersianshop.onrender.com/uploads/${data.img.replace(/^uploads[\\/]/, '')}`}
                            alt={data.category}
                            style={{backgroundColor: '#faf7f1' ,mixBlendMode:'multiply',height:'250px',width:"250px"}}
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
                <CardActions>
                    <Button onClick={() => dispatch(addProduct(temp))} size="big" color="primary" sx={{
                        backgroundColor: '#3ecf8e',
                        color: 'white',
                        width: '100%',
                        textAlign: 'center',
                        fontFamily: "mine",
                        '&:hover': {
                            backgroundColor: '#35b399',
                        },
                    }}>
                       افزودن به سبد خرید
                    </Button>
                </CardActions>
            </Card>
        </myContext.Provider>
    );
}
