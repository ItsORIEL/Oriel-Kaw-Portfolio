import React from 'react';
import { Box, Typography, Fade, Button, Stack, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useStore } from '../store';
import { RESUME_DATA } from '../data';

export const Interface: React.FC = () => {
  const { activeSection, setActiveSection, mode, setMode } = useStore();
  const activeData = activeSection !== null ? RESUME_DATA[activeSection] : null;

  const handleBack = () => {
    setActiveSection(null);
    setMode('overview');
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <Box sx={{ position: 'absolute', top: 40, left: 40, pointerEvents: 'auto', zIndex: 50 }}>
        <Typography variant="h6" sx={{ color: '#fff', letterSpacing: '0.2em', fontWeight: 300 }}>
          ORIEL<span style={{ fontWeight: 700, color: '#00ffff' }}>KAW</span>
        </Typography>
      </Box>

      <Fade in={mode === 'intro'} timeout={1000}>
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: { xs: '5%', md: '10%' },
            maxWidth: '600px',
            pointerEvents: mode === 'intro' ? 'auto' : 'none',
            zIndex: 20
          }}
        >
          <Typography variant="overline" sx={{ color: '#00ffff', letterSpacing: '4px', fontSize: '12px', mb: 2, display: 'block' }}>
            Senior Frontend Developer
          </Typography>
          <Typography variant="h1" sx={{ color: 'white', fontWeight: 700, fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 0.9, mb: 3, textTransform: 'uppercase' }}>
            Fabric of<br />Our Future
          </Typography>
          <Typography variant="body1" sx={{ color: '#aaa', maxWidth: '400px', mb: 4, lineHeight: 1.6 }}>
            Building the interconnected elements that become the fabric of our digital future.
          </Typography>
          <Button 
            variant="outlined" 
            endIcon={<ArrowForwardIcon />}
            onClick={() => setMode('overview')}
            sx={{ 
              borderColor: 'rgba(255,255,255,0.3)', 
              color: '#fff',
              borderRadius: '50px',
              px: 4, py: 1.5,
              '&:hover': { borderColor: '#00ffff', background: 'rgba(0, 255, 255, 0.1)' }
            }}
          >
            Explore the Galaxy
          </Button>
        </Box>
      </Fade>

      <Fade in={mode === 'detail'} timeout={1000}>
        <Box
          sx={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'radial-gradient(circle at center, rgba(0,20,40,0.4) 0%, rgba(0,0,0,0.95) 100%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
            padding: 4,
            pointerEvents: mode === 'detail' ? 'auto' : 'none',
            zIndex: 30
          }}
        >
          {activeData && (
            <Box sx={{ maxWidth: '800px' }}>
              <Box sx={{ position: 'relative', zIndex: 100 }}>
                <Button 
                  startIcon={<ArrowBackIosNewIcon />} 
                  onClick={handleBack}
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    mb: 4, 
                    border: '1px solid rgba(255,255,255,0.1)',
                    px: 3,
                    borderRadius: 10,
                    '&:hover': { color: 'white', background: 'rgba(255,255,255,0.1)' } 
                  }}
                >
                  Back to Overview
                </Button>
              </Box>

              <Typography variant="overline" sx={{ color: '#00ffff', letterSpacing: '4px', fontSize: '14px', fontWeight: 600, mb: 2, display: 'block' }}>
                {activeData.role}
              </Typography>
              <Typography variant="h2" sx={{ color: 'white', fontWeight: 300, textTransform: 'uppercase', lineHeight: 1, mb: 4, textShadow: '0 0 30px rgba(0,255,255,0.3)' }}>
                {activeData.title}
              </Typography>
              <Typography variant="h6" sx={{ color: '#ccc', fontWeight: 300, lineHeight: 1.6, maxWidth: '600px', mx: 'auto', mb: 6 }}>
                {activeData.description}
              </Typography>
              <Stack direction="row" justifyContent="center" spacing={2} flexWrap="wrap" gap={2}>
                {activeData.tech.map((t) => (
                  <Chip key={t} label={t} sx={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', background: 'rgba(255,255,255,0.05)', borderWidth: '1px', borderStyle: 'solid' }} />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Fade>
    </Box>
  );
};