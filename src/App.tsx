import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Interface } from './components/Interface';
import { Galaxy } from './components/Galaxy';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#000000' },
    primary: { main: '#00ffff' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
        
        <Interface />
        
        <Canvas 
          camera={{ position: [0, 20, 45], fov: 60 }} 
          gl={{ antialias: false, toneMappingExposure: 1.5 }}
          dpr={[1, 2]} 
        >
          <color attach="background" args={['#050505']} />
          
          <Suspense fallback={null}>
            <Galaxy />
          </Suspense>

          {/* Fixed: Removed disableNormalPass */}
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2} 
              mipmapBlur 
              intensity={1.5} 
              radius={0.4} 
            />
            <Noise opacity={0.05} />
          </EffectComposer>
        </Canvas>
      </div>
    </ThemeProvider>
  );
};

export default App;