# JsGame

A JavaScript library inspired by Pygame.  
This project recreates common Pygame functions for drawing and input handling.

## Table of contents

0. [Description](#jsgame)
1. [Table of contents](#table-of-contents)
2. [Emoji legend](#legend)
3. [Top level pygame packages (pygame.*)](#top-level-pygame-packages-pygame)
4. [Draw (pygame.draw)](#pygamedraw)

## Implemented Functions
### Legend
✅ - Implemented<br>
🟧 - Working on it<br>
🔳 - Unimplemented<br>
❌ - Won't be implemented<br>
🔳/❌ - Undecided<br>

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

### pygame.key
```
🔳 - key.get_focused
true if the display is receiving keyboard input from the system

🔳 - key.get_pressed
get the state of all keyboard buttons

🔳 - key.get_mods
determine which modifier keys are being held

🔳 - key.set_mods
temporarily set which modifier keys are pressed

🔳 - key.set_repeat
control how held keys are repeated

🔳 - key.get_repeat
see how held keys are repeated

🔳 - key.name
get the name of a key identifier

🔳 - key.key_code
get the key identifier from a key name

🔳/❌ - key.start_text_input
start handling Unicode text input events

🔳/❌ - key.stop_text_input
stop handling Unicode text input events

🔳/❌ - key.set_text_input_rect
controls the position of the candidate list
```