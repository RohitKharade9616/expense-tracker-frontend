import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTooltip,
  ApexGrid
} from 'ng-apexcharts';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddIncome } from '../../income-management/components/add-income/add-income';
import { AddExpense } from '../../expense-management/components/add-expense/add-expense';
import { CommonServices } from '../../../shared/services/common-services';
// import { AddExpense } from '../../expense-management/components/add-expense/add-expense';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  grid: ApexGrid;
};
export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard-component',
  imports: [MatCardModule, MatIcon, ChartComponent,MatButtonModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {
 chartOptions: ChartOptions = {
    series: [
      {
        name: 'Income',
        data: []
      }
    ],
    chart: {
      type: 'line',
      height: 300,
      toolbar: { show: false },
      foreColor: '#cbd5f5' // text color for dark mode
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: '#334155'
    }
  };
  
  BarChartOptions :any= {
      series: [
        {
          name: "Expense",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      // dataLabels: {
      //   enabled: true,
      //   formatter: function(val:any) {
      //     return val + "%";
      //   },
      //   offsetY: -20,
      //   style: {
      //     fontSize: "12px",
      //     colors: ["#304758"]
      //   }
      // },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val:any) {
            return val + "%";
          }
        }
      },
      title: {
        text: "Monthly Inflation in Argentina, 2002",
        floating: 0,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
  }

    DonutChartOptions:any = {
      series: [],
      chart: {
        height: 350,
        type: 'donut',
      },
      // plotOptions: {
      //   pie: {
      //     donut: {
      //       labels: {
      //         show: true,
      //         name: {
      //           show: false
      //         },
      //         value: {
      //           show: true,
      //           formatter: (val:any) => {
      //             return val + ' tCO2e';
      //           }
      //         },
      //         total: {
      //           show: true,
      //           showAlways: false,
      //           formatter: (w:any) => {
      //             return w.globals.seriesTotals.reduce((a:any, b:any) => {
      //               return a + b
      //             }, 0) + ' tCO2e'
      //           }
      //         }
      //       }
      //     }
      //   }
      // },
      colors: [
        '#37647D',
        '#CE634B',
        '#418B7C',
        '#DDBA6A',
        '#80A473',
        '#DB9B4D',
      ],
      labels: ['Goods & Services', 'Offices', 'Marketing', 'Employees', 'Travel', 'Other'],
      dataLabels: {
        enabled: false,
      },
      legend: {
        // show: false
      },
    };
  constructor(private dialog:MatDialog,private commonService:CommonServices)
  {
    this.getMonthlyIncome();
    this.getMonthlyExpense();
    this.getExpenseByCategories();
  }
addIncome()
{
  this.dialog.open(AddIncome, {
    width: '500px',
    height:'600px',
    data: { message: 'Hello' }
  });

}
addExpense()
{
  this.dialog.open(AddExpense, {
    width: '500px',
    height:'600px',
    data: { message: 'Hello' }
  });

}

  getMonthlyIncome()
  {
    this.commonService.getMonthlyIncome().subscribe((response:any)=>{
      this.chartOptions.series = [
        {
          name: 'Income', 
          data: response.data.map((item:any) => item.totalIncome)
        }
      ];
    }, error => {
      console.error('Error fetching monthly income:', error);
    });
  }

  getMonthlyExpense(){
    this.commonService.getMonthlyExpense().subscribe((response:any)=>{
      if(response) {
        // Create an array of 12 months initialized with 0
        const monthlyData = new Array(12).fill(0);
        
        // Map API response to the correct month position
        response.forEach((item:any) => {
          monthlyData[item.monthNumber - 1] = item.totalAmount;
        });
      
      this.BarChartOptions.series = [
        {
          name: 'Expense', 
          data: monthlyData
        }
      ];
    }}, error => {
      console.error('Error fetching monthly expense:', error);
    });
  }

  getExpenseByCategories()
  {
    this.commonService.getExpenseByCategory().subscribe((res:any)=>{
      if(res)
      {
        this.DonutChartOptions.series = res.map((item:any) => item.totalAmount);
        this.DonutChartOptions.labels = res.map((item:any) => item.categoryName);
      }
    }
    )
  }
}
