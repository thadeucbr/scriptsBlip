async function loadFigmaComponents(): Promise<ComponentNode[]> {
  // const keys = {
  //   quickReply: 'b76be06bc442bd0358a1efa49386412727180cd2',
  //   api: '2f92ec94cabdaa45d3ecda06a751fcca4e89f916',
  //   observation: 'd91993ce226abaa7d566b1fe070f572cf7767e83',
  //   id: '22a9f9dea96bd581180f99b71d77da55df8b9043',
  //   logicOnly: '2df68ec6270ae4c1b5b0aac17a0bd7d4d1e14544',
  //   tracking: 'ecca091fcea8909ae7c1891f110c5889a5ada069',
  //   message: 'd6d3d3f22546ad4a10232226ef8ecf88eecea1cf',
  //   menu: '7617bb5f099d30b747d0f7b975548dba2e79ffe7',
  //   title: '287a60b23a049e97436812161eaca6c4a05c7f37'
  // }
  const keys = {
    quickReply: 'f1250d1f7179efab6c0edabd91f936ee8648050b',
    api: '013c031be1b61f6bda9bc154b86c99f725ee23da',
    observation: '507a60dc7dd68dad1ca38ddff6c875411356a31a',
    id: '388730f4ef4095006905e54e41fcf2d82b9a1d5a',
    logicOnly: '3e5345cd385ed712442074ecc76f23a77bcf0acf',
    tracking: 'f32d5bac1b6f9fcd0c57b0eadedc19ba743c55e8',
    message: '025f152a4a18d72d8e6d19d7c3635186b0fcb2b4',
    menu: 'f32d5bac1b6f9fcd0c57b0eadedc19ba743c55e8',
    title: 'f32d5bac1b6f9fcd0c57b0eadedc19ba743c55e8'
  }
  const [
    idComponent,
    // dynamicContentComponent,
    macroComponent,
    observationComponent,
    selectComponent,
    selectImediateComponent,
    sendMessageComponent,
    trackingComponent,
    apiComponent,
    titleComponent
  ] = await Promise.all([
    figma.importComponentByKeyAsync(keys.id),
    figma.importComponentByKeyAsync(keys.logicOnly),
    figma.importComponentByKeyAsync(keys.observation),
    figma.importComponentByKeyAsync(keys.menu),
    figma.importComponentByKeyAsync(keys.quickReply),
    figma.importComponentByKeyAsync(keys.message),
    figma.importComponentByKeyAsync(keys.tracking),
    figma.importComponentByKeyAsync(keys.api),
    figma.importComponentByKeyAsync(keys.title)
  ])

  return [
    idComponent,
    macroComponent,
    observationComponent,
    selectComponent,
    selectImediateComponent,
    sendMessageComponent,
    trackingComponent,
    apiComponent,
    titleComponent
  ]
}

export default loadFigmaComponents()
