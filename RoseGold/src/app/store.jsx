import { create } from "zustand";

// Helper function to update header basket count
const updateHeaderBasketCount = (products) => {
  if (typeof window !== 'undefined' && window.updateBasketCount) {
    const totalCount = products.reduce((sum, item) => sum + item.count, 0);
    window.updateBasketCount(totalCount);
  }
};

const useStore = create((set) => ({
  products:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartProducts")) || []
      : [],
  num: 0,

  // 📌 افزودن محصول به سبد خرید
  addProduct: (product) =>
    set((state) => {
      const existingProduct = state.products.find(
        (item) => item.id === product.id
      );
      let newProducts;

      if (existingProduct) {
        // افزایش تعداد محصول در سبد خرید
        newProducts = state.products.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
        alert("Product quantity increased in cart!");
      } else {
        // افزودن محصول جدید به سبد خرید
        newProducts = [...state.products, { ...product, count: 1 }];
        alert("Product added to cart!");
      }

      localStorage.setItem("cartProducts", JSON.stringify(newProducts));
      
      // Update header basket count
      updateHeaderBasketCount(newProducts);
      
      return { products: newProducts };
    }),

  // 📌 افزایش تعداد محصول در سبد خرید
  plusFromCart: (pId) =>
    set((state) => {
      const newProducts = state.products.map((item) =>
        item.id === pId ? { ...item, count: item.count + 1 } : item
      );

      localStorage.setItem("cartProducts", JSON.stringify(newProducts));
      
      // Update header basket count
      updateHeaderBasketCount(newProducts);
      
      return { products: newProducts };
    }),

  // 📌 کاهش تعداد محصول از سبد خرید
  minusFromCart: (pId) =>
    set((state) => {
      let newProducts = state.products.map((item) =>
        item.id === pId ? { ...item, count: item.count - 1 } : item
      );

      // حذف محصول اگر تعداد آن 0 شود
      newProducts = newProducts.filter((item) => item.count > 0);

      localStorage.setItem("cartProducts", JSON.stringify(newProducts));
      
      // Update header basket count
      updateHeaderBasketCount(newProducts);
      
      return { products: newProducts };
    }),

  // 📌 محاسبه قیمت کل سبد خرید
  totalPrice: () =>
    set((state) => {
      let total = state.products.reduce(
        (sum, item) => sum + item.price * item.count,
        0
      );
      return { num: total };
    }),

  // 📌 پاک کردن سبد خرید بعد از خرید
  clearCart: () =>
    set(() => {
      localStorage.removeItem("cartProducts");
      
      // Update header basket count to 0
      if (typeof window !== 'undefined' && window.updateBasketCount) {
        window.updateBasketCount(0);
      }
      
      return { products: [] };
    }),

  // 📌 ثبت سفارش و ارسال به سرور
  placeOrder: async (userToken) => {
    set(async (state) => {
      try {
        const response = await fetch("https://miivpersianshop.onrender.com/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            products: state.products.map((item) => ({
              product: item.id,
              quantity: item.count,
            })),
            totalAmount: state.products.reduce(
              (sum, item) => sum + item.price * item.count,
              0
            ),
            paymentMethod: "Online",
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Order placed successfully!");
          localStorage.removeItem("cartProducts");
          
          // Update header basket count to 0
          if (typeof window !== 'undefined' && window.updateBasketCount) {
            window.updateBasketCount(0);
          }
          
          return { products: [] }; // پاک کردن سبد خرید بعد از ثبت سفارش
        } else {
          alert(data.error || "Order failed!");
        }
      } catch (error) {
        console.error("Order submission failed:", error);
      }
    });
  },
}));

export default useStore;
