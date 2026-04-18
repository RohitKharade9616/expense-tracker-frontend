import { AfterViewInit, Component, Input, OnChanges, ViewChild, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditIncome } from '../edit-income/edit-income';
import { CommonServices } from '../../../../shared/services/common-services';

@Component({
  selector: 'app-income-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, CommonModule],
  templateUrl: './income-list.html',
  styleUrls: ['./income-list.css']
})
export class IncomeList implements AfterViewInit, OnChanges {

  displayedColumns: string[] = ['incomdeId', 'Date', 'Description', 'Category', 'Source', 'Amount', 'Actions'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() incomeList: any[] = [];
constructor(private dialog:MatDialog,private commonServices:CommonServices)
{

}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['incomeList'] && this.incomeList) {
      this.dataSource.data = this.incomeList;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  editIncome(element: any) {
    console.log('Edit income:', element);
    this.dialog.open(EditIncome, {
      width: '500px',
      height: '600px',
      data: { income: element }
    });
  }
  deleteIncome(element: any) {
    const id = element.incomeId;
    this.commonServices.deleteIncome(id).subscribe((res: any) => {
      if (res) {
        alert('Income deleted successfully');
        this.incomeList = this.incomeList.filter((income: any) => income.incomeId !== id);
        this.dataSource.data = this.incomeList;
      }
    });
  }

  trackByExpense(index: number, item: any) {
    return item && item.incomeId ? item.incomeId : index;
  }
}