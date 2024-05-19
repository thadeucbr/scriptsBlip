function cloneComponentByName(name: string): ComponentNode | null {
  const components = figma.root.findAll(
    (node) => node.type === 'COMPONENT' && node.name === name
  ) as ComponentNode[]

  if (components.length > 0) {
    const component = components[0]
    const clone = component.clone()
    return clone
  }

  figma.notify(`Component with name "${name}" not found.`)
  return null
}

export default cloneComponentByName
