# JsGame

A JavaScript library inspired by Pygame.  
This project recreates common Pygame functions for drawing and input handling.

## Implemented Functions

✅ - Implemented<br>
🟧 - Working on it<br>
🔳 - Unimplemented<br>
❌ - Won't be implemented<br>

### top level pygame packages (pygame.*)
```
✅ - pygame.init
creates canvas if one doesn't exist and returns its context 2d

✅ - pygame.quit
calls all quit callbacks [and closes the window]

✅ - pygame.get_init
returns True if pygame is currently initialized

❌ - pygame.error
standards pygame exception

❌ - pygame.get_error
gets the current error message

❌ - pygame.set_error
sets the current error message

❌ - pygame.get_sdl_version
gets the version number of SDL

❌ - pygame.get_sdl_byteorder
gets the byte order of SDL

✅ - pygame.register_quit
registers a function to be called when pygame quits

❌ - pygame.encode_string
Encodes a Unicode or bytes object

❌ - pygame.encode_file_path
Encodes a Unicode or bytes object as a file system path
```

### pygame.draw
```
✅ - draw.rect
Draws a rectangle

✅ - draw.polygon
Draws a polygon

✅ - draw.circle
Draws a circle

✅ - draw.ellipse
Draws a ellipse

✅ - draw.arc
Draws a elliptical arc

✅ - draw.line
Draws a straight line

✅ - draw.lines
Draws multiple contiguous straight line segments

❌ - draw.aaline
Draws a straight antialiased line

❌ - draw.aalines
Draws multiple contiguous straight antialiased line segments
```