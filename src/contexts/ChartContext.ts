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
    yearValue: DataRow[],
    monthValue: DataRow[],
    dayValue: DataRow[],
    yearUnits: DataRow[],
    monthUnits: DataRow[],
    dayUnits: DataRow[]
}

export interface DataRow {
    x: number,
    y1: number,
    y2: number
}

export class ChartData {
    public diagramType: DiagramType = DiagramType.LINE_CHART;
    public dataType: DataOnDiagram = DataOnDiagram.SALES_VALUE;
    public isDataDuringUpdate: boolean = false;
    public timePeriod: TimePeriod = TimePeriod.DAY;
    public data: Data;

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