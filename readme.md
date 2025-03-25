# JSGame
## Essential just me remaking PyGame but in javascript

## Classes

### `Vector2`
Represents a 2D vector.

#### Constructor
```js
new Vector2(x, y)
```
- `x` *(number)*: The x-coordinate.
- `y` *(number)*: The y-coordinate.

### `Key`
Handles keyboard input events.

#### Constructor
```js
new Key()
```
- Listens for `keydown`, `keyup`, `focus`, and `blur` events.

#### Methods
```js
get_pressed()
```
Returns an object containing currently pressed keys.

```js
get_focused()
```
Returns whether the window is focused.

### `colorRGBA`
Represents an RGBA color.

#### Constructor
```js
new colorRGBA(R, G, B, Transparency)
```
- `R` *(number, default: 255)*: Red value.
- `G` *(number, default: 255)*: Green value.
- `B` *(number, default: 255)*: Blue value.
- `Transparency` *(number, default: 1)*: Alpha value.

### `Rect`
Represents a rectangle shape.

#### Constructor
```js
new Rect(pX, pY, sW, sH, fillColor, rotation)
```
- `pX`, `pY` *(number)*: Position.
- `sW`, `sH` *(number)*: Width and height.
- `fillColor` *(colorRGBA, default: white)*: Fill color.
- `rotation` *(number, default: 0)*: Rotation angle.

### `Circle`
Represents a circular shape.

#### Constructor
```js
new Circle(pX, pY, R, fillColor, rotation)
```
- `pX`, `pY` *(number)*: Position.
- `R` *(number)*: Radius.
- `fillColor` *(colorRGBA, default: white)*: Fill color.
- `rotation` *(number, default: 0)*: Rotation angle.

### `Triangle`
Represents a triangular shape.

#### Constructor
```js
new Triangle(pX, pY, base, height, fillColor, rotation)
```
- `pX`, `pY` *(number)*: Position.
- `base`, `height` *(number)*: Dimensions.
- `fillColor` *(colorRGBA, default: white)*: Fill color.
- `rotation` *(number, default: 0)*: Rotation angle.

## Functions

### `Draw(object)`
Renders a shape on the page.

#### Parameters
- `object` *(Rect, Circle, Triangle)*: The shape to draw.

### `Fill(fillColor)`
Fills the background with a specified color.

#### Parameters
- `fillColor` *(colorRGBA, default: white)*: Background color.

## Exported Modules
```js
export { colorRGBA, Rect, Circle, Triangle, Key, Draw, Fill };
