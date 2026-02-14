import { Component, inject, viewChild } from '@angular/core';
import { TableComponent } from '@common/components/table/table.component';
import { QuizzesTableConfigFactory } from '@app/modules/quizzes/pages/quizzes/factories/quizzes-table-config.factory';
import { QuizzesListApiService } from '@app/modules/quizzes/pages/quizzes/api/quizzes-list-api.service';
import { QuizzesDataSourceService } from '@app/modules/quizzes/pages/quizzes/services/quizzes-data-source.service';
import { ButtonComponent } from '@common/components/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Route } from '@app/core/enums/route.enum';
import { ModalService } from '@common/services/modal.service';
import { QuizCopyModalComponent } from '@app/modules/quizzes/pages/quizzes/modals/copy-modal/quiz-copy-modal.component';

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
  private readonly _modalService = inject(ModalService);

  private readonly _table = viewChild.required(TableComponent);

  public config = this._tableConfigFactory.Create();

  public async navigateToQuizCreation(): Promise<void> {
    await this._router.navigate([Route.QuizCreate]);
  }

  public async copyQuiz(): Promise<void> {
    this._modalService.open<boolean>(QuizCopyModalComponent, (result) => {
      if (result) {
        this._table().refreshDataSource();
      }
    });
  }
}
