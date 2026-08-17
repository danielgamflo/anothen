# Testing Guide - 3D Birds System

## Quick Start

### Local Testing (Recommended)
```bash
# Navigate to project directory
cd /Users/danielgamboaflores/Desktop/PROYECTOS/Freelace/Anothen

# Start Python HTTP server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Expected Behavior

#### Desktop (1280x800+)
- ✅ 30 3D birds visible moving across screen
- ✅ Birds move in flocking patterns (together but avoiding collision)
- ✅ Moving mouse causes birds to flee away from cursor
- ✅ Birds wrap around screen edges
- ✅ Wings animate continuously
- ✅ Birds visible between background (parallax) and content (logo, form)
- ✅ Smooth 60 FPS animation

#### Mobile (≤768px)
- ✅ 15 3D birds (reduced for performance)
- ✅ Touch interaction: birds flee from finger position
- ✅ Same flocking behavior as desktop
- ✅ Proper responsive sizing
- ✅ No lag or stutter

## Verification Checklist

### Visual
- [ ] Birds appear in 3D (gray bodies with yellow eyes)
- [ ] Birds are behind content (logo, form visible)
- [ ] Birds are in front of background (parallax visible behind)
- [ ] Wings animate (flapping motion)
- [ ] Birds orient toward flight direction

### Interaction
- [ ] Desktop: Move mouse across screen, birds flee
- [ ] Mobile: Touch/drag finger, birds flee away
- [ ] Birds don't escape screen (wrap-around works)
- [ ] Multiple birds interact with each other

### Performance
- [ ] No lag when moving mouse
- [ ] 60 FPS maintained (check DevTools Performance tab)
- [ ] CPU usage reasonable (<10% on idle)
- [ ] No memory leaks (check DevTools Memory)

### Responsiveness
- [ ] Resize browser window, birds adapt
- [ ] Mobile view (414x896): shows 15 birds
- [ ] Tablet view (768x1024): still smooth
- [ ] Desktop (1920x1080): 30 birds visible

## Browser Developer Tools

### Chrome/Firefox DevTools

#### Check Three.js Loaded
```javascript
// Press F12, go to Console, paste:
console.log('Three.js available:', typeof THREE !== 'undefined');
console.log('BirdsScene:', typeof birdsScene !== 'undefined');
```

#### Check Performance
```javascript
// In Console:
// Create performance observer
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
  }
});
observer.observe({entryTypes: ['measure']});
```

#### Monitor FPS
- Open DevTools > Performance
- Click record, move mouse for 5 seconds
- Click stop
- Look for consistent 16.7ms frames (60 FPS)

#### Check Memory Usage
- Open DevTools > Memory
- Take heap snapshot
- Should be ~15-20MB for birds system alone

### Console Logs
Expected console output:
```
3D Birds scene initialized: 30 birds on desktop
```

## Troubleshooting

### Birds Not Appearing

**Problem**: Canvas shows white/empty
- [ ] Check console for errors: `F12 > Console`
- [ ] Verify Three.js loaded: `console.log(typeof THREE)`
- [ ] Check canvas element: `document.getElementById('birds-canvas')`

**Solution**:
1. Make sure you're using HTTP server (not file://)
2. Check that CDN scripts loaded (DevTools > Network)
3. Verify WebGL support: `canvas.getContext('webgl')`

### Low Performance

**Problem**: Laggy movement, stuttering
- [ ] Reduce bird count in code (line 1054: `this.birdCount = 10;`)
- [ ] Disable anti-aliasing (line 1078: `antialias: false`)
- [ ] Lower pixel ratio (line 1086: `Math.min(window.devicePixelRatio, 1.0)`)

### Birds Not Fleeing from Mouse

**Problem**: Moving cursor doesn't affect birds
- [ ] Check mouse event: Move mouse slowly across canvas
- [ ] Verify coordinates: Add console.log in mousemove (line 1239)
- [ ] Try touch on mobile: Should trigger same behavior

### Visible Performance Issues

- [ ] Check GPU: DevTools > Rendering > Show rendering stats
- [ ] Look for red bars = GPU bottleneck
- [ ] Look for yellow/red in FPS graph = CPU bottleneck

## Test Scenarios

### Scenario 1: Basic Functionality (2 min)
1. Load page at http://localhost:8000
2. See 30 birds flying
3. Move mouse, birds flee
4. Refresh page, still works

### Scenario 2: Responsive Design (3 min)
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone 12: See 15 birds
4. Resize to iPad: See 15 birds
5. Resize to Desktop: See 30 birds

### Scenario 3: Performance (2 min)
1. Open DevTools Performance tab
2. Start recording
3. Move mouse around for 5 seconds
4. Stop recording
5. Check: Should see mostly green (60 FPS)
6. FPS counter should stay >50

### Scenario 4: Edge Cases (2 min)
1. Spam mouse movement: Birds still smooth
2. Tap rapidly on mobile: Birds still respond
3. Drag mouse to corner: Birds wrap around
4. Resize window mid-animation: Scene adapts

## Expected Output Samples

### Console Logs
```
3D Birds scene initialized: 30 birds on desktop
(or: 3D Birds scene initialized: 15 birds on mobile)
```

### DevTools Memory
- Initial: ~8-10MB
- Running: ~15-20MB
- Static: Should not grow over time

### DevTools Performance
- Frame time: ~16.7ms average (60 FPS)
- Boids algorithm: <5ms
- Rendering: ~10ms

## Git Commit Info
```
commit c99fd5f
Author: Claude Haiku 4.5
Date:   [timestamp]

feat: Implement 3D forest birds system with boids flocking
```

## Files Changed
- `index.html` - Main implementation (Three.js scene + boids)
- `BIRDS_SETUP.md` - Setup guide for GLTF models
- `TESTING.md` - This file
- `.claude/launch.json` - Dev server config
- `models/` - Directory for future GLTF models

## Notes
- First load may take 1-2 seconds to initialize Three.js
- CDN scripts cached after first load (better performance on reload)
- System automatically detects mobile vs desktop
- No external dependencies except Three.js from CDN

## Support
If issues occur:
1. Check console for error messages
2. Verify HTTP server is running (not file://)
3. Clear browser cache (Ctrl+Shift+Del)
4. Try different browser (Chrome, Firefox, Safari)
5. Check that WebGL is enabled in browser
