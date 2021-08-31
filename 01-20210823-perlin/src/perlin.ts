export type PerlinSingleton = {
    generate(
        seedArray: number[][],
        width: number,
        height: number,
        octavesCount: number,
        scale: number,
        scaleDivider: number,
        frequency: number,
        frequencyDivider: number
    ): number[][];
};

export class Perlin {
    private static _instance: Perlin;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static generate(
        seedArray: number[][],
        width: number,
        height: number,
        octavesCount: number,
        scale: number,
        scaleDivider: number,
        frequency: number,
        frequencyDivider: number
    ): number[][] {
        const instance = this.getInstance();
        const noises: number[][] = [];
        for(const seed of seedArray) {
            noises.push(instance.createNoise(seed, width, octavesCount, scale, scaleDivider, frequency, frequencyDivider));
        }
        if(seedArray.length === 1 || height === 1) return noises;
        return this.generate2D(height, width, noises);
    }

    private static getInstance(): Perlin {
        if(!this._instance) this._instance = new Perlin();
        return this._instance;
    }

    private static generate2D(height: number, width: number, noises: number[][]): number[][] {
        const instance = this.getInstance();
        const result = instance.createArray(height, <number[]>[]);
        const indices = [0, ...instance.getNthIndices(height, height / (noises.length - 1))];
        instance.setNthItems(result, indices, noises);
        let leftIndex: number;
        for(let i = 0; i < result.length; i++) {
            if(indices.includes(i)) {
                leftIndex = i;
                continue;
            }
            result[i] = instance.createArray(width, 0);
            const rightIndex = indices.find(m => m > i);
            for(let j = 0; j < result[i].length; j++) {
                result[i][j] = instance.interpolate(result[leftIndex][j], result[rightIndex][j], rightIndex - leftIndex, i - leftIndex);
            }
        }
        return result;
    }

    private createNoise(seed: number[], width: number, octavesCount: number, scale:number, scaleDivider: number, frequency: number, frequencyDivider: number): number[] {
        const noise = this.createArray(width, 0);
        const harmonics = this.createHarmonics(seed, width, octavesCount, frequency, frequencyDivider);
        const scales = this.createScales(scale, scaleDivider, harmonics.length);
        for(let i = 0; i < harmonics.length; i++) {
            for(let j = 0; j < harmonics[i].length; j++) {
                noise[j] += harmonics[i][j] * scales[i];
            }
        }
        return noise;
    }

    private createScales(baseScale: number, divider: number, quantity: number): number[] {
        const result = [baseScale];
        for(let i = 1; i < quantity; i++) {
            result[i] = result[i - 1] / divider;
        }
        return result;
    }

    private createHarmonics(seed: number[], width: number, octavesCount: number, frequency: number, frequencyDivider: number): number[][] {
        const result: number[][] = [];
        let currentFrequency = frequency;
        for(let i = 0; i < octavesCount; i++) {
            result.push(this.createOctave(seed, width, currentFrequency));
            currentFrequency /= frequencyDivider;
        }
        return result;
    }

    private createOctave(seed: number[], width: number, frequency: number): number[] {
        const result: number[] = this.createArray(width, 0);
        const fixedValues = [seed[0], ...this.getNthItems(seed, frequency)];
        const fixedIndices = [0, ...this.getNthIndices(width, width / (fixedValues.length - 1))];
        this.setNthItems(result, fixedIndices, fixedValues);
        this.fillOctave(result, fixedIndices);
        return result;
    }

    private fillOctave(octave: number[], predefinedValueIndices: number[]): void {
        let leftIndex: number;
        for(let i = 0; i < octave.length; i++) {
            if(predefinedValueIndices.includes(i)) {
                leftIndex = i;
                continue;
            }
            const rightPredefinedIndex = predefinedValueIndices.find(m => m > i);
            const distance = rightPredefinedIndex - leftIndex;
            octave[i] = this.interpolate(octave[leftIndex], octave[rightPredefinedIndex], distance, i - leftIndex);
        }
    }

    private interpolate(left: number, right: number, distance: number, position: number): number {
        const difference = left - right;
        const step = difference / distance;
        const result = left - position * step;
        return result;
    }

    private setNthItems<T>(target: T[], indices: number[], source: T[]): void {
        if(indices.length !== source.length) return;
        for(let i = 0; i < indices.length; i++) {
            target[indices[i]] = source[i];
        }
    }

    private getNthIndices(length: number, step: number): number[] {
        const result: number[] = [];
        const quantity = length / step + 1;
        for(let i = 1; i < quantity; i++) {
            const index = i * step - 1;
            result.push(Math.round(index));
        }
        return result;
    }

    private getNthItems(arr: number[], step: number): number[] {
        const result: number[] = [];
        const quantity = arr.length / step + 1;
        for(let i = 1; i < quantity; i++) {
            const index = i * step - 1;
            result.push(arr[index]);
        }
        return result;
    }

    private createArray<T>(length: number, defaultValue: T): T[] {
        const result: T[] = [];
        for(let i = 0; i < length; i++) {
            result.push(defaultValue);
        }
        return result;
    }
}
