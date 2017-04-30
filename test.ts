abstract class Calculator<T> {
    abstract create(): T;
    abstract add(out: T, addend: T, augend: T): T;
    addn(addend: T, augend: T): T {
        return this.add(this.create(), addend, augend);
    }
}

class CalculatorNumber extends Calculator<number> {
    create(): number {
        return 0;
    }
    add(out: number, addend: number, augend: number): number {
        return addend + augend;
    }
}

class GameTime {
    dt: number;                  // float
    micros: number = 0;          // long
    millis: number = 0;          // long
    seconds: number = 0;         // float
    lastTime: number = 0;        // long
    currentTime: number = 0;     // long
    startTime: number = 0;       // long
    interpolation: number = 0;   // float
    reverse: number = 0;         // float
    updates: number = 1;         // int
    draws: boolean = true;

    setElapsed(micros: number): void {
        this.seconds = this.dt = micros * 0.000001;
        this.millis = micros * 0.001;
        this.micros = micros;
    }
    tick(): number {
        this.lastTime = this.currentTime;
        this.currentTime = window.performance.now();
        return (this.currentTime - this.lastTime);
    }
    reset(): void {
        this.startTime = this.lastTime = this.currentTime = window.performance.now();
    }
}

interface GameLoop {
    onStart(state: GameTime): void;
    onLoop(state: GameTime): void;
}

class GameLoopVariable implements GameLoop {
    maximumElapsed: number;
    constructor(maximumElapsed: number) {
        this.maximumElapsed = maximumElapsed;
    }
    onStart(state: GameTime): void {
        state.reset();
    }
    onLoop(state: GameTime): void {
        state.setElapsed(Math.min(this.maximumElapsed, state.tick()));
    }
}

let calc = new CalculatorNumber();

alert(calc.add(0, 5, 4));

let loop: GameLoop = new GameLoopVariable(0.10);


