/**
 * Returns the component instance from the base component provided
 *
 * @param {object} component : base component to generate the instance
 * @return {object} : Component instance
 *
 * @see {@link [types.registerElement]}
 * @see {@link [types.duplicatePage]}
 */
export function compInst (component) {
  return {
    global: true,
    name: component.name,
    top: component.top,
    left: component.left,
    bottom: component.bottom,
    right: component.right,
    componegg: component.componegg,
    egglement: component.egglement,
    containegg: component.containegg
  }
}

/**
 * Returns the component reference from the base component provided
 *
 * @param {object} component : base component to generate the instance
 * @return {object} : Component reference
 *
 * @see {@link [types.registerElement]}
 * @see {@link [types.duplicatePage]}
 */
export function compRef (component) {
  return {
    usageCount: 1,
    name: component.name,
    height: component.height,
    width: component.width,
    type: component.type,
    text: component.text,
    attrs: component.attrs,
    styles: component.styles,
    classes: component.classes,
    children: component.children,
    dependencies: component.dependencies || []
  }
}

const componentFactory = {
  compInst,
  compRef
}

export default componentFactory
