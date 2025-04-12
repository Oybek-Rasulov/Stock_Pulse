import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon } from '../components/User/CustomIcons';
import { Link } from 'react-router-dom';   // React Router Link



import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail
} from '../firebase/firebase';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
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

export default function SignIn(props) {
  const handleGoogleLogin = async () => {
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
        window.location.href = '/'; // ✅ Redirect to home
      }
    } catch (error) {
      console.error('❌ Google Sign-In Error:', error);
    }
  };
  

  const handleFacebookLogin = async () => {
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
        localStorage.setItem('user', JSON.stringify(data.user)); // ✅ Save user
        window.location.href = '/'; // ✅ Redirect
      }
    } catch (error) {
      console.error('❌ Facebook Sign-In Error:', error);
    }
  };
  

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 1rem)' }}
          >
            Login
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleLogin}
              startIcon={<GoogleIcon />}
              sx={{color: '#fff', height: '3.5rem', '&:hover': { backgroundColor: '#333' } }}
            >
              Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleFacebookLogin}
              startIcon={<FacebookIcon />}
              sx={{color: '#fff', height: '3.5rem', '&:hover': { backgroundColor: '#333' } }}

            >
              Facebook
            </Button>

            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link to="/register" style={{ alignSelf: 'center', fontSize: '0.875rem' }}>
                Register
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
