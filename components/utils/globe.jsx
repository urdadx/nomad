import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { useSpring } from 'react-spring';
import useIntersectionObserver from '@/hooks/use-intersection-observer';

export default function GlobeClient({ markers }) {
  const divRef = useRef();
  const entry = useIntersectionObserver(divRef, {});
  const isVisible = !!entry?.isIntersecting;
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowGlobe(true);
    } else {
      setShowGlobe(false);
    }
  }, [isVisible]);

  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = window.document.createElement('canvas');
      const ctx =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      ctx.getSupportedExtensions();
    } catch (e) {
      // WebGL isn't properly supported
      setWebglSupported(false);
      console.log('WebGL not supported, hiding globe animation...');
      return;
    }
  }, []);

  return (
    <div
      ref={divRef}
      className={`${
        webglSupported ? 'min-h-[500px] sm:min-h-[1000px]' : 'min-h-[50px]'
      } h-full`}
    >
      {webglSupported && showGlobe && (
        <GlobeAnimation markers={markers || []} />
      )}
    </div>
  );
}

const GlobeAnimation = ({ markers }) => {
  const canvasRef = useRef();
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 60,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phi = -0.5;
    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1,
      width,
      height: width,
      phi,
      theta: 0.15,
      dark: 0,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 20000,
      mapBrightness: 4,
      baseColor: [1, 1, 1],
      markerColor: [249 / 255, 115 / 255, 22 / 255],
      offset: [0, 0],
      glowColor: [0.8, 0.8, 0.8],
      markers: markers || [],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        phi += 0.002;
        state.phi = phi + r.get();
        state.width = width;
        state.height = width;
      },
    });
    setTimeout(() => (canvasRef.current.style.opacity = '1'));
    return () => globe.destroy();
  }, [markers, r]);

  return (
    <>
      <div className="relative flex items-center">
        <div
          style={{
            width: '100%',
            maxWidth: 1000,
            aspectRatio: '1',
            margin: 'auto',
            marginBottom: '0px',
            position: 'relative',
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              pointerInteracting.current =
                e.clientX - pointerInteractionMovement.current;
              canvasRef.current.style.cursor = 'grabbing';
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              canvasRef.current.style.cursor = 'grab';
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              canvasRef.current.style.cursor = 'grab';
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                api.start({
                  r: delta / 100,
                });
              }
            }}
            onTouchMove={(e) => {
              if (pointerInteracting.current !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                api.start({
                  r: delta / 100,
                });
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              contain: 'layout paint size',
              opacity: 0,
              transition: 'opacity 1s ease',
            }}
          />
        </div>
      </div>
      <div className="w-full h-full mx-auto">
        <p className="text-center text-gray-600 font-semibold text-md">
          Made with ❤ by the <span className="text-primary">Nomad Team</span>
        </p>
      </div>
    </>
  );
};
