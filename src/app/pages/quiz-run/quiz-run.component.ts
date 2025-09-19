import { Component, inject, OnInit, viewChild } from '@angular/core';
import { QuizRunApiService } from './services/quiz-run-api.service';
import { AsyncPageComponent } from '../../../../common/components/async-page/async-page.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../common/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonStyle } from '../../../../common/components/button/enums/style.enum';
import { QuizRunQuestionComponent } from './components/question/question.component';
import { QuizRunFormFactory } from './factories/quiz-run-form.factory';
import { IQuizRunForm } from './interfaces/quiz-run-form.interface';
import { IQuizRunFormOpenQuestion } from './interfaces/quiz-run-form-question.interface';
import { QuizRunQuestionsHelper } from './helpers/quiz-run-questions.helper';
import { QuizRunRequestFactory } from './factories/quiz-run-request.factory';
import { Route } from '../../core/enums/route.enum';
import { QuizToRunResponse } from './models/responses/quiz-to-run.response';
import { CountDownComponent } from '../../../../common/components/count-down/count-down.component';
import { PeriodModel } from '../../../../common/models/period.model';

@Component({
  selector: 'app-quiz-run',
  imports: [
    AsyncPageComponent,
    ReactiveFormsModule,
    ButtonComponent,
    QuizRunQuestionComponent,
    CountDownComponent,
  ],
  templateUrl: './quiz-run.component.html',
  styleUrl: './quiz-run.component.scss',
  providers: [QuizRunApiService, TranslatePipe],
})
export class QuizRunComponent implements OnInit {
  public countDownComponent = viewChild.required(CountDownComponent);

  public get isLoading(): boolean {
    return !this.isInitialized || this._isSaving;
  }

  public readonly ButtonStyle = ButtonStyle;

  public isInitialized = false;
  public form!: FormGroup<IQuizRunForm>;
  public questions!: IQuizRunFormOpenQuestion[];
  public durationInSeconds!: number;

  private readonly _quizRunApiService = inject(QuizRunApiService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  private _isSaving = false;
  private _response!: QuizToRunResponse;

  public async ngOnInit(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this._response = await this._quizRunApiService.getQuizToRun(id!);
    this.form = QuizRunFormFactory.Create(this._response);
    this.questions = QuizRunQuestionsHelper.Merge(this.form);
    this.durationInSeconds = this._response.duration.getTotalSeconds();
    this.isInitialized = true;
  }

  public finish(): void {
    this.countDownComponent().finish();
  }

  public async persist(quizRunningPeriod: PeriodModel<Date>): Promise<void> {
    this._isSaving = true;

    await this._quizRunApiService
      .verify(QuizRunRequestFactory.Create(this._response, this.form, quizRunningPeriod))
      .then(() => this._router.navigateByUrl(Route.Quizzes))
      .finally(() => (this._isSaving = false));
  }
}
