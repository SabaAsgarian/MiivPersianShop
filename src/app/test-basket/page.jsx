"use client"

import React from 'react';
import PrimarySearchAppBar from '../components/header';
import TestBasket from '../components/test-basket';
import Footer from '../components/footer';

export default function TestBasketPage() {
  return (
    <>
      <PrimarySearchAppBar />
      <TestBasket />
      <Footer />
    </>
  );
} 