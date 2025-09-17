import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../common/components/table/table.component';
import { QuizzesTableConfigFactory } from './factories/quizzes-table-config.factory';
import { QuizzesListApiService } from './services/quizzes-list-api.service';
import { QuizzesDataSourceService } from './services/quizzes-data-source.service';
import { ButtonComponent } from '../../../../common/components/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Route } from '../../core/enums/route.enum';

@Component({
  selector: 'app-quizzes',
  imports: [TableComponent, ButtonComponent],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss',
  providers: [QuizzesListApiService, QuizzesDataSourceService, QuizzesTableConfigFactory, TranslatePipe],
})
export class QuizzesComponent {
  private readonly _tableConfigFactory = inject(QuizzesTableConfigFactory);
  private readonly _router = inject(Router);

  public config = this._tableConfigFactory.Create();

  public async navigateToQuizCreation(): Promise<void> {
    await this._router.navigate([Route.QuizCreate]);
  }
}
