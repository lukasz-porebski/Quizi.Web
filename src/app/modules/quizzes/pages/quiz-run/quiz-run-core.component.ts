import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizRunApiService } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/quiz-run-api.service';
import type { QuizToRunResponse } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/responses/quiz-to-run.response';
import { isDefined, isEmpty } from '@common/utils/utils';
import { QuizRunRequestFactory } from '@app/modules/quizzes/pages/quiz-run/pages/run/factories/quiz-run-request.factory';
import { AsyncPageComponent } from '@common/components/async-page/async-page.component';
import { QuizRunComponent } from '@app/modules/quizzes/pages/quiz-run/pages/run/quiz-run.component';
import type { QuizRunFinishedEvent } from '@app/modules/quizzes/pages/quiz-run/pages/run/models/quiz-run-finished.event';
import { QuizRunOpenQuestionsVerificationComponent } from '@app/modules/quizzes/pages/quiz-run/pages/open-questions-verification/quiz-run-open-questions-verification.component';
import type { FormArray } from '@angular/forms';
import type { QuizRunOpenQuestionVerificationFormControl } from '@app/modules/quizzes/pages/quiz-run/pages/open-questions-verification/form/quiz-run-open-question-verification.form-control';
import type { Optional } from '@common/types/optional.type';
import { Route } from '@app/core/enums/route.enum';

@Component({
  selector: 'app-quiz-run-core',
  imports: [AsyncPageComponent, QuizRunComponent, QuizRunOpenQuestionsVerificationComponent],
  templateUrl: './quiz-run-core.component.html',
  styleUrl: './quiz-run-core.component.scss',
  providers: [QuizRunApiService],
})
export class QuizRunCoreComponent implements OnInit {
  private readonly _quizRunApiService = inject(QuizRunApiService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  public get isLoading(): boolean {
    return !this.isInitialized || this._isSaving;
  }

  public get isInitialized(): boolean {
    return isDefined(this.response);
  }

  public response!: QuizToRunResponse;
  public quizRunFinishedEvent?: QuizRunFinishedEvent;
  public isOpenQuestionsVerification = false;

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
