# React Portal

# Basic Usage

It is possible to wrap a HTML block with [Overlay](https://github.com/vtex-apps/react-portal/blob/master/react/Overlay.tsx) to make use of its advantages such as making the block overlap any other block dispite the its z-index

## Example:

```
<Overlay>
  <div className={boxClasses} style={boxPositionStyle} ref={boxRef}>
    <div
      className={`${
        styles.popoverContentContainer
      } mt3-ns bg-base shadow-3-ns`}
    >
      {children}
    </div>
    <div
      className={`${
        styles.popoverArrowUp
      } absolute top-0 rotate-135 dib-ns dn-s ${arrowClasses}`}
    />
  </div>
</Overlay> 
```
