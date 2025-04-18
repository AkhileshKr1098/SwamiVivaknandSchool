import { Component, OnInit } from '@angular/core';
import { StudentFeeInstallment, StudentFeeInstallmentRes } from 'src/app/interface/feeInstallment.interface';
import { CrudService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-std-fee-structure',
  templateUrl: './std-fee-structure.component.html',
  styleUrls: ['./std-fee-structure.component.scss']
})
export class StdFeeStructureComponent implements OnInit {
  installmentList: StudentFeeInstallment[] = []
  filterInstallment: StudentFeeInstallment[] = []

  constructor(
    private _crud: CrudService
  ) { }

  ngOnInit() {
    this.getFeeStr()
  }


  getFeeStr() {
    this._crud.getFeeInstallment().subscribe(
      (res: StudentFeeInstallmentRes) => {
        console.log(res);
        this.installmentList = res.data
        this.filterInstallment = res.data
      }
    )
  }

  onSearch(event: any) {
    const filter = event.target.value?.toLowerCase() || '';
    this.filterInstallment = this.installmentList.filter(data =>
      data?.class?.toLowerCase().includes(filter) ||
      data?.total_fees?.toString().includes(filter)
    )
  }
}
