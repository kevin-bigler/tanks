// TODO: pass params here for configuring the stage size, background
// TODO: extract the stage declaration -- it's kind of out of place here
const initRenderer = () => {
    const width = 800;
    const height = 600;

    const renderer = PIXI.autoDetectRenderer(width, height,{backgroundColor : 0x1099bb}); // transparent: true also works
    // document.getElementById('main').appendChild(app.view);
    document.body.appendChild(renderer.view);

    // create the root of the scene graph
    const stage = new PIXI.Container();

    return {renderer, stage};
};

export default initRenderer;