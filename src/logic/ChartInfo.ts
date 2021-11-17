export enum TimePeriod {
    DAY,
    MONTH,
    YEAR
}

export enum DataOnDiagram {
    SALES_VALUE,
    SOLD_UNITS
}

export enum DiagramType {
    BAR_CHART,
    LINE_CHART
}

export class ColorRGBA {
    public r: number;
    public g: number;
    public b: number;
    public a: number;


    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

export class ChartInfo {
    public diagramType: DiagramType = DiagramType.LINE_CHART;
    public dataType: DataOnDiagram = DataOnDiagram.SALES_VALUE;
    public isDataDuringUpdate: boolean = false;
    public timePeriod: TimePeriod = TimePeriod.DAY;
    public secondDataSet: boolean = true;
    public firstSetColor: ColorRGBA = new ColorRGBA(85, 204, 34, 1);
    public secondSetColor: ColorRGBA = new ColorRGBA(84, 169, 253, 1);
}