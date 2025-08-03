"use client"

import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TestBasket() {
  const handleAddToBasket = () => {
    if (typeof window !== 'undefined' && window.addToBasket) {
      window.addToBasket();
    }
  };

  const handleRemoveFromBasket = () => {
    if (typeof window !== 'undefined' && window.removeFromBasket) {
      window.removeFromBasket();
    }
  };

  const handleClearBasket = () => {
    if (typeof window !== 'undefined' && window.clearBasket) {
      window.clearBasket();
    }
  };

  const getBasketCount = () => {
    if (typeof window !== 'undefined' && window.getBasketCount) {
      return window.getBasketCount();
    }
    return 0;
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 3, 
      padding: 4,
      minHeight: '50vh',
      backgroundColor: '#f5f5f5'
    }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontFamily: 'mine', marginBottom: 2, color: '#45424e' }}>
          تست شمارنده سبد خرید
        </Typography>
        
        <Typography variant="h6" sx={{ fontFamily: 'mine', marginBottom: 3, color: '#35b399' }}>
          تعداد محصولات در سبد: {getBasketCount()}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddToBasket}
            sx={{
              backgroundColor: '#35b399',
              color: 'white',
              fontFamily: 'mine',
              '&:hover': {
                backgroundColor: '#3ecf8e',
              },
            }}
          >
            افزودن محصول
          </Button>

          <Button
            variant="contained"
            startIcon={<RemoveIcon />}
            onClick={handleRemoveFromBasket}
            disabled={getBasketCount() === 0}
            sx={{
              backgroundColor: '#ff6b6b',
              color: 'white',
              fontFamily: 'mine',
              '&:hover': {
                backgroundColor: '#ff5252',
              },
              '&:disabled': {
                backgroundColor: '#ccc',
              },
            }}
          >
            حذف محصول
          </Button>

          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleClearBasket}
            disabled={getBasketCount() === 0}
            sx={{
              backgroundColor: '#ff9800',
              color: 'white',
              fontFamily: 'mine',
              '&:hover': {
                backgroundColor: '#f57c00',
              },
              '&:disabled': {
                backgroundColor: '#ccc',
              },
            }}
          >
            پاک کردن سبد
          </Button>
        </Box>

        <Typography variant="body2" sx={{ 
          fontFamily: 'mine', 
          marginTop: 3, 
          color: '#757181',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          این صفحه برای تست عملکرد شمارنده سبد خرید طراحی شده است. 
          شمارنده در هدر صفحه نمایش داده می‌شود و با localStorage ذخیره می‌شود.
        </Typography>
      </Paper>
    </Box>
  );
} 