class Engine {
    public container: HTMLElement;
    public loader: PIXI.loaders.Loader;
    public renderer: PIXI.SystemRenderer;
    public stage: PIXI.Container;
    public graphics: PIXI.Graphics;
    public fps: number;
    public elapsed: double;

    constructor(width: number, height: number, containerId?: string, fps = 60) {
        this.loader = PIXI.loader;
        this.renderer = PIXI.autoDetectRenderer(width, height, { "antialias": true });
        this.stage = new PIXI.Container();
        this.graphics = new PIXI.Graphics();
        this.fps = fps;
        this.elapsed = performance.now();

        this.container = containerId ? document.getElementById(containerId) || document.body : document.body;
        this.container.appendChild(this.renderer.view);
    } // constructor
} // Engine