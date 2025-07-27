import { Component } from '@angular/core';
import { TableComponent } from '../../../../common/components/table/table.component';
import { QuizzesTableConfigFactory } from './factories/quizzes-table-config.factory';

@Component({
  selector: 'app-quizzes',
  imports: [TableComponent],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss',
})
export class QuizzesComponent {
  public config = QuizzesTableConfigFactory.Create();
}
