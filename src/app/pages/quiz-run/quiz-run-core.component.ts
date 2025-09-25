import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizRunApiService } from './pages/run/services/quiz-run-api.service';
import { QuizToRunResponse } from './pages/run/models/responses/quiz-to-run.response';
import { isDefined, isEmpty } from '../../../../common/utils/utils';
import { QuizRunRequestFactory } from './pages/run/factories/quiz-run-request.factory';
import { Route } from '../../core/enums/route.enum';
import { AsyncPageComponent } from '../../../../common/components/async-page/async-page.component';
import { QuizRunComponent } from './pages/run/quiz-run.component';
import { QuizRunFinishedEvent } from './pages/run/models/events/quiz-run-finished.event';
import { QuizRunOpenQuestionsVerificationComponent } from './pages/open-questions-verification/quiz-run-open-questions-verification.component';
import { FormArray } from '@angular/forms';
import { QuizRunOpenQuestionVerificationFormControl } from './pages/open-questions-verification/form/quiz-run-open-question-verification.form-control';
import { Optional } from '../../../../common/types/optional.type';

@Component({
  selector: 'app-quiz-run-core',
  imports: [AsyncPageComponent, QuizRunComponent, QuizRunOpenQuestionsVerificationComponent],
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
  public quizRunFinishedEvent?: QuizRunFinishedEvent;
  public isOpenQuestionsVerification = false;

  private readonly _quizRunApiService = inject(QuizRunApiService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  private _isSaving = false;

  public async ngOnInit(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.response = await this._quizRunApiService.getQuizToRun(id!);
  }

  public async tryPersist(event: QuizRunFinishedEvent): Promise<void> {
    this.quizRunFinishedEvent = event;
    if (isEmpty(this.quizRunFinishedEvent.form.value.openQuestions?.filter((o) => !isEmpty(o)))) {
      await this.persist(null);
    } else {
      this.isOpenQuestionsVerification = true;
    }
  }

  public async persist(
    openQuestionsVerificationForm: Optional<FormArray<QuizRunOpenQuestionVerificationFormControl>>,
  ): Promise<void> {
    this._isSaving = true;

    await this._quizRunApiService
      .verify(
        QuizRunRequestFactory.Create(
          this.response,
          this.quizRunFinishedEvent!,
          openQuestionsVerificationForm,
        ),
      )
      .then((quizResultId) => this._router.navigateByUrl(`${Route.QuizResult}${quizResultId}`))
      .finally(() => (this._isSaving = false));
  }
}
