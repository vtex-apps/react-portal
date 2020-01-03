# React Portal

# Basic Usage

It is possible to wrap a React element with [Overlay](https://github.com/vtex-apps/react-portal/blob/master/react/Overlay.tsx) to make use of its advantages such as making the block overlap any other block despite its z-index.

## Example:

```
<Overlay>
  <div>Hello World!</div>
</Overlay>
```

## Props

| Prop name           | Type          | Description                                                  | Default value |
| ------------        | ------------- | ------------------------------------------------------------ | ------------- |
| `verticalAlignment` | `Boolean`     | align vertically even if the Fullwindow prop is true                                               | `false`
| `alignment`         | `String`      | Horizontal alignment                                         | `left`        |
| `fullWindow`        | `Boolean`     | If true, the overlay will fill the whole window horizontally | -             |
| `target`            | `HTMLElement` | Defines the container where the overlay will be created.     | -             |
Here are the possible values of `HorizontalAlignment`

| Value    | Description         |
| -------- | ------------------- |
| 'center' | Align to the center |
| 'left'   | Align to the left   |
| 'right'  | Align to the right  |
