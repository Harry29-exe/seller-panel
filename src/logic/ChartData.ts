import {ChartInfo} from "./ChartInfo";

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

export class ChartDataInfo {
    public info: ChartInfo = new ChartInfo();
    public data: Data;

    constructor(data: Data) {
        this.data = data;

    }

    public clone(): ChartDataInfo {
        let clone = new ChartDataInfo(this.data);
        clone.info = this.info;
        return clone;
    }
}