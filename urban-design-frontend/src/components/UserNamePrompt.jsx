// src/components/UserNamePrompt.tsx
import { useState } from 'react';
import { TextField, Button, Card, Typography, Box } from '@mui/material';
import { useAppDispatch } from '../redux/hooks';
import { setUsername } from '../redux/userSlice';
import { fetchProjects } from "../redux/projectSlice";

export default function UserNamePrompt() {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();

  const handleContinue = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    dispatch(setUsername(trimmed));
    dispatch(fetchProjects(trimmed));
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#1e1e1e',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 0,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400, padding: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            Enter Username to Continue
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#444' },
                '&:hover fieldset': { borderColor: '#888' },
                '&.Mui-focused fieldset': { borderColor: '#aaa' },
              },
              mb: 2,
            }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleContinue}
            sx={{
              backgroundColor: '#3b82f6',
              color: 'white',
              ':hover': { backgroundColor: '#2563eb' },
            }}
          >
            CONTINUE
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
