import React from "react";

export const ChartContext = React.createContext<{data: ChartData, update: () => void} | null>(null);

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

export interface Data {

}

export class ChartData {
    public diagramType: DiagramType = DiagramType.LINE_CHART;
    public dataType: DataOnDiagram = DataOnDiagram.SALES_VALUE;
    public isDataDuringUpdate: boolean = false;
    public timePeriod: TimePeriod = TimePeriod.DAY;
    public data: any;

    constructor(data: Data) {
        this.data = data;
    }

    public clone(): ChartData {
        let clone = new ChartData(this.data);
        clone.diagramType = this.diagramType;
        clone.dataType = this.dataType;
        clone.isDataDuringUpdate = this.isDataDuringUpdate;
        clone.timePeriod = this.timePeriod;
        return clone;
    }

}