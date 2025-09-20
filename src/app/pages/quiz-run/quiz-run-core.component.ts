import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizRunApiService } from './pages/run/services/quiz-run-api.service';
import { QuizToRunResponse } from './pages/run/models/responses/quiz-to-run.response';
import { isDefined } from '../../../../common/utils/utils';
import { PeriodModel } from '../../../../common/models/period.model';
import { QuizRunRequestFactory } from './pages/run/factories/quiz-run-request.factory';
import { Route } from '../../core/enums/route.enum';
import { AsyncPageComponent } from '../../../../common/components/async-page/async-page.component';
import { QuizRunComponent } from './pages/run/quiz-run.component';
import { QuizRunFinishedEvent } from './pages/run/models/events/quiz-run-finished.event';

@Component({
  selector: 'app-quiz-run-core',
  imports: [AsyncPageComponent, QuizRunComponent],
  templateUrl: './quiz-run-core.component.html',
  styleUrl: './quiz-run-core.component.scss',
  providers: [QuizRunApiService],
})
export class QuizRunCoreComponent implements OnInit {
  public get isLoading(): boolean {
    return !this.isInitialized || this._isSaving;
  }

  public get isInitialized(): boolean {
    return isDefined(this.response);
  }

  public response!: QuizToRunResponse;

  private readonly _quizRunApiService = inject(QuizRunApiService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  private _isSaving = false;
  private _quizRunFinishedEvent?: QuizRunFinishedEvent;

  public async ngOnInit(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.response = await this._quizRunApiService.getQuizToRun(id!);
  }

  public verify(event: QuizRunFinishedEvent): void {
    this._quizRunFinishedEvent = event;
  }

  public async persist(quizRunningPeriod: PeriodModel<Date>): Promise<void> {
    this._isSaving = true;

    await this._quizRunApiService
      .verify(
        QuizRunRequestFactory.Create(this.response, this._quizRunFinishedEvent!.form, quizRunningPeriod),
      )
      .then(() => this._router.navigateByUrl(Route.Quizzes))
      .finally(() => (this._isSaving = false));
  }
}
