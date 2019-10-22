export const graphTime: Array<string> = [
    "0時",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23"
]
import * as Highcharts from 'highcharts'
export interface Draw {
    top_chart: Array<number>,
    bt_chart: Array<number>,
}
export class Draw {
    constructor(top_chart: Array<number>, bt_chart: Array<number>) {
        this.top_chart = top_chart
        this.bt_chart = bt_chart
    }
    public draw(): boolean {
        const tar: string = "astartebot"
        Highcharts.chart(tar, {
            chart: {
                type: "line"
            },
            title: {
                text: "Today Toots Chart"
            },
            subtitle: {
                text: ""
            },
            xAxis: {
                categories: graphTime
            },
            yAxis: {
                title: {
                    text: "Toots"
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [
                {
                    name: "Toots",
                    data: this.top_chart
                },
                {
                    name: "Boosts",
                    data: this.bt_chart
                }
            ]
        } as Highcharts.Options);
        return true
    }
    
}