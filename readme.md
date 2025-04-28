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

### pygame.event
```
🔳/❌ - event.pump
internally process pygame event handlers

🔳 - event.get
get events from the queue

🔳 - event.poll
get a single event from the queue

🔳 - event.wait
wait for a single event from the queue

🔳 - event.peek
test if event types are waiting on the queue

🔳 - event.clear
remove all events from the queue

🔳 - event.event_name
get the string name from an event id

🔳 - event.set_blocked
control which events are allowed on the queue

🔳 - event.set_allowed
control which events are allowed on the queue

🔳 - event.get_blocked
test if a type of event is blocked from the queue

🔳 - event.set_grab
control the sharing of input devices with other applications

🔳 - event.get_grab
test if the program is sharing input devices

🔳/❌ - event.set_keyboard_grab
grab enables capture of system keyboard shortcuts like Alt+Tab or the Meta/Super key.

🔳/❌ - event.get_keyboard_grab
get the current keyboard grab state

🔳 - event.post
place a new event on the queue

🔳 - event.custom_type
make custom user event type

🔳 - event.Event
pygame object for representing events
```

### pygame.display
```
🔳 - display.init
Initialize the display module

🔳 - display.quit
Uninitialize the display module

🔳 - display.get_init
Returns True if the display module has been initialized

❌ - display.set_mode
Initialize a window or screen for display

🔳 - display.get_surface
Get a reference to the currently set display surface

❌ - display.flip
Update the full display Surface to the screen

❌ - display.update
Update portions of the screen for software displays

❌ - display.get_driver
Get the name of the pygame display backend

❌ - display.Info
Create a video display information object

❌ - display.get_wm_info
Get information about the current windowing system

🔳 - display.get_desktop_sizes
Get sizes of active desktops

❌ - display.list_modes
Get list of available fullscreen modes

❌ - display.mode_ok
Pick the best color depth for a display mode

❌ - display.gl_get_attribute
Get the value for an OpenGL flag for the current display

❌ - display.gl_set_attribute
Request an OpenGL display attribute for the display mode

🔳 - display.get_active
Returns True when the display is active on the screen

❌ - display.iconify
Iconify the display surface

🔳 - display.toggle_fullscreen
Switch between fullscreen and windowed displays

❌ - display.set_gamma
Change the hardware gamma ramps

❌ - display.set_gamma_ramp
Change the hardware gamma ramps with a custom lookup

🔳 - display.set_icon
Change the system image for the display window

🔳 - display.set_caption
Set the current window caption

🔳 - display.get_caption
Get the current window caption

❌ - display.set_palette
Set the display color palette for indexed displays

🔳 - display.get_num_displays
Return the number of displays

🔳 - display.get_window_size
Return the size of the window or screen

❌ - display.get_allow_screensaver
Return whether the screensaver is allowed to run.

❌ - display.set_allow_screensaver
Set whether the screensaver may run
```