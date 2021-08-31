import { PerlinSingleton } from "./perlin";

declare const Perlin: PerlinSingleton;

export class PageConfig {
    public numberOfSeeds = 8;
    public width = 128;
    public height = 128;
    public octaves = 4;
    public scale = 1;
    public scaleDivider = 2;
    public frequency = 8;
    public frequencyDivider = 2;
}

export class Page {
    private readonly _config: PageConfig;
    private readonly _context: CanvasRenderingContext2D;

    public constructor() {
        this._config = new PageConfig();
        this._context = this.getCanvas().getContext("2d");
    }

    public run(): void {
        const seeds = this.getSeeds(this._config.numberOfSeeds);
        const noise = Perlin.generate(
            seeds,
            this._config.width,
            this._config.height,
            this._config.octaves,
            this._config.scale,
            this._config.scaleDivider,
            this._config.frequency,
            this._config.frequencyDivider
        );
        const width = Math.floor(this.getCanvas().width / this._config.width);
        const height = Math.floor(this.getCanvas().height / this._config.height);

        let size = height;
        let multiplier = this._config.height;
        if(height > width) {
            size = width;
            multiplier = this._config.width;
        }
        this.resizeCanvas(size * multiplier, size * multiplier);
        const pixelSize = this.getCanvas().width / this._config.width;

        for(let i = 0; i < noise.length; i++) {
            for(let j = 0; j < noise[i].length; j++) {
                const x = pixelSize * j;
                const y = pixelSize * i;
                this.drawPixel(x, y, this.getColor(noise[i][j]));
            }
        }
    }

    private resizeCanvas(width: number, height: number): void {
        const canvas = this.getCanvas();
        canvas.width = width;
        canvas.height = height;
    }

    private getSeeds(num: number): number[][] {
        const result: number[][] = [];
        for(let i = 0; i < num; i++) {
            result.push(this.getRandomArray());
        }
        return result;
    }

    private getColor(value: number): string {
        if(value < 41) return "darkblue";
        if(value < 61) return "blue";
        if(value < 71) return "yellow";
        if(value < 81) return "green";
        return "darkgreen";
    }

    private drawPixel(x: number, y: number, color: string): void {
        this._context.beginPath();
        this._context.fillStyle = color;
        this._context.fillRect(x, y, 1, 1);
        this._context.fill();
    }

    private getCanvas(): HTMLCanvasElement {
        return <HTMLCanvasElement>document.getElementById("sohacanvas");
    }

    private getRandomArray(): number[] {
        const result: number[] = [];
        for(let i = 0; i < 16; i++) {
            result.push(this.getRandomNumberBetween(1,60));
        }
        return result;
    }   

    private getRandomNumberBetween(min: number, max: number): number {
        return +(Math.floor(Math.random() * max) + min).toFixed(4);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const page = new Page();
    page.run();
})
