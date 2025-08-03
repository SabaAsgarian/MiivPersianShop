"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  CircularProgress,
  Backdrop,
  IconButton
} from "@mui/material";
import { useRouter } from "next/navigation";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Link from "next/link";
import { useUser } from "../../../context/mycontext";
import Header from "../headerAcc";
import Footer from "../footerAcc";
import CustomizedBreadcrumbs from "../bradcrumbsAcc";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://miivpersianshop.onrender.com";

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const WhiteTextField = styled(TextField)({
  backgroundColor: "#ffffff",
  borderRadius: "4px",
  "& .MuiInputBase-input": {
    color: "black",
  },
  "& .MuiInputLabel-root": {
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "grey",
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#3ecf8e",
  color: "white",
  "&:hover": {
    backgroundColor: "#3ecf8e",
  },
});

export default function UserLogin() {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { loginUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Date.now() / 1000;
      if (payload.exp < now) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        router.push("/components/account");
      }
    }
  }, [router]);

  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      pass: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          const token = data.token;
          const payload = JSON.parse(atob(token.split(".")[1]));
          const userId = data.user._id || payload.id;

          const userData = {
            ...data.user,
            _id: userId,
            id: userId,
          };

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData));

          // Refresh page to update header
          window.location.href = "/components/account";
        } else {
          formik.setErrors({ submit: data.error || "Login failed" });
        }
      } catch (error) {
        formik.setErrors({ submit: "Login error: " + error.message });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Header />
     
      <Container
        maxWidth="2xl"
        sx={{
          minHeight: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Backdrop
          sx={{
            color: "black",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={isLoading}
        >
          <p>بارگذاری...</p>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "#ffffff",
            minHeight: "70dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.75)",
            direction:"rtl"
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <StyledForm onSubmit={formik.handleSubmit}>
              <h1 style={{fontFamily:"mineB", textAlign: "start", marginTop: "2rem", fontSize: "32px", }}>
                ورود کاربر
              </h1>

              <label htmlFor="email" style={{fontFamily:"mine",fontSize:"16px"}}>ایمیل : </label>
              <WhiteTextField
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <label htmlFor="pass" style={{fontFamily:"mine",fontSize:"16px"}}>گذرواژه : </label>
              <Box sx={{ position: "relative", width: "100%" }}>
                <WhiteTextField
                  id="pass"
                  name="pass"
                  placeholder="Password"
                  type={showPass ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pass}
                  error={formik.touched.pass && Boolean(formik.errors.pass)}
                  helperText={formik.touched.pass && formik.errors.pass}
                  fullWidth
                />
                <IconButton
                  onClick={() => setShowPass(!showPass)}
                  sx={{
                   color:'black',
                    height: "100%",
                  }}
                >
                  {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </Box>

              {(formik.touched.email && formik.errors.email) ||
              (formik.touched.pass && formik.errors.pass) ? (
                <Typography color="error" fontSize="0.9rem">
                  <ErrorOutlineIcon fontSize="small" />{" "}
                  {formik.errors.email || formik.errors.pass}
                </Typography>
              ) : null}

              {formik.errors.submit && (
                <Typography color="error" fontSize="0.9rem">
                  <ErrorOutlineIcon fontSize="small" /> {formik.errors.submit}
                </Typography>
              )}

              <StyledButton type="submit" sx={{fontFamily:"mine",fontSize:"16px"}}>ورود </StyledButton>

              <Box sx={{marginTop:"2%",marginBottom:"2%"}}>
                <Typography sx={{fontFamily:"mine",fontSize:"16px"}}>عضو نیستید ؟ ثبت نام کنید .</Typography>
                <Link href="/components/account/userregister">
                  <StyledButton sx={{marginTop:"2%",marginBottom:"5%",fontFamily:"mine",fontSize:"16px"}}>

                    ثبت نام
                  </StyledButton>
                </Link>
              </Box>
            </StyledForm>

            
          </Box>
        </Container>
      </Container>
      <Footer />
    </>
  );
}
