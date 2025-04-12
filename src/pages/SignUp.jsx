import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // React Router Link

import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../components/User/CustomIcons';

// 👉 Import Firebase
import {
  auth,
  facebookProvider,
  googleProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  FacebookAuthProvider
} from '../firebase/firebase.js';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(0, 0%, 27%, 0.4), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  // 👉 Google Sign Up
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
  
      const res = await fetch('http://localhost:3001/api/auth/firebase-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
  
      const data = await res.json();
  
      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user)); // ✅ Save user
        window.location.href = '/'; // ✅ Redirect after sign-up
      }
    } catch (error) {
      console.error('Google Sign Up Error:', error);
    }
  };
  

  // 👉 Facebook Sign Up
  const handleFacebookSignup = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const token = await result.user.getIdToken();
  
      const res = await fetch('http://localhost:3001/api/auth/firebase-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
  
      const data = await res.json();
  
      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/';
      }
  
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const pendingCred = FacebookAuthProvider.credentialFromError(error);
        const email = error.customData?.email;
  
        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);
  
          if (methods.includes('google.com')) {
            alert('⚠️ Email already linked with Google. Please sign in with Google.');
          } else if (methods.includes('password')) {
            alert('⚠️ Email linked with password. Please log in using email/password.');
          } else {
            alert('⚠️ This account is already linked. Try logging in.');
          }
  
        } catch (lookupError) {
          console.error('❌ Lookup error:', lookupError);
          alert('Error resolving account conflict.');
        }
  
      } else {
        console.error('❌ Facebook Sign Up Error:', error);
      }
    }
  };
  

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 1rem)' }}
          >
            Register
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleSignup}
              startIcon={<GoogleIcon />}
              sx={{color: '#fff', height: '3.5rem', '&:hover': { backgroundColor: '#333' } }}
            >
              Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleFacebookSignup}
              startIcon={<FacebookIcon />}
              sx={{color: '#fff', height: '3.5rem', '&:hover': { backgroundColor: '#333' } }}
            >
              Facebook
            </Button>

            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ alignSelf: 'center', fontSize: '0.875rem' }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
