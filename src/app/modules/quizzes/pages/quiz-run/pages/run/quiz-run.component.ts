import type { OnInit } from '@angular/core';
import { Component, inject, input, output, viewChild } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { QuizRunQuestionComponent } from '@app/modules/quizzes/pages/quiz-run/pages/run/components/question/question.component';
import { QuizRunFormFactory } from '@app/modules/quizzes/pages/quiz-run/pages/run/factories/quiz-run-form.factory';
import type { IQuizRunForm } from '@app/modules/quizzes/pages/quiz-run/pages/run/interfaces/quiz-run-form.interface';
import type { IQuizRunFormOpenQuestion } from '@app/modules/quizzes/pages/quiz-run/pages/run/interfaces/quiz-run-form-question.interface';
import { QuizRunQuestionsHelper } from '@app/modules/quizzes/pages/quiz-run/pages/run/helpers/quiz-run-questions.helper';
import type { QuizToRunResponse } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/responses/quiz-to-run.response';
import type { QuizRunFinishedEvent } from '@app/modules/quizzes/pages/quiz-run/pages/run/models/quiz-run-finished.event';
import { Route } from '@app/core/enums/route.enum';
import { Router } from '@angular/router';
import type { PeriodModel } from 'lp-common';
import { ButtonComponent, ButtonStyle, CountDownComponent } from 'lp-common';

@Component({
  selector: 'app-quiz-run',
  imports: [ReactiveFormsModule, QuizRunQuestionComponent, CountDownComponent, ButtonComponent],
  templateUrl: './quiz-run.component.html',
  styleUrl: './quiz-run.component.scss',
  providers: [TranslatePipe],
})
export class QuizRunComponent implements OnInit {
  public readonly countDownComponent = viewChild.required(CountDownComponent);

  public readonly response = input.required<QuizToRunResponse>();
  public readonly finished = output<QuizRunFinishedEvent>();

  private readonly _router = inject(Router);

  public readonly ButtonStyle = ButtonStyle;

  public isInitialized = false;
  public form!: FormGroup<IQuizRunForm>;
  public questions!: IQuizRunFormOpenQuestion[];
  public durationInSeconds!: number;

  public ngOnInit(): void {
    this.form = QuizRunFormFactory.Create(this.response());
    this.questions = QuizRunQuestionsHelper.Merge(this.form);
    this.durationInSeconds = this.response().duration.getTotalSeconds();
    this.isInitialized = true;
  }

  public async backToList(): Promise<void> {
    await this._router.navigateByUrl(Route.Quizzes);
  }

  public finish(quizRunningPeriod: PeriodModel<Date>): void {
    this.finished.emit({
      form: this.form,
      quizRunningPeriod: quizRunningPeriod,
    });
  }

  public finishCounting(): void {
    this.countDownComponent().finish();
  }
}
