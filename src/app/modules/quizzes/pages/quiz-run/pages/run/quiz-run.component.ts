import { Component, inject, input, OnInit, output, viewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../../../../../common/components/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonStyle } from '../../../../../../../../common/components/button/enums/style.enum';
import { QuizRunQuestionComponent } from './components/question/question.component';
import { QuizRunFormFactory } from './factories/quiz-run-form.factory';
import { IQuizRunForm } from './interfaces/quiz-run-form.interface';
import { IQuizRunFormOpenQuestion } from './interfaces/quiz-run-form-question.interface';
import { QuizRunQuestionsHelper } from './helpers/quiz-run-questions.helper';
import { QuizToRunResponse } from './api/responses/quiz-to-run.response';
import { CountDownComponent } from '../../../../../../../../common/components/count-down/count-down.component';
import { QuizRunFinishedEvent } from './models/quiz-run-finished.event';
import { PeriodModel } from '../../../../../../../../common/models/period.model';
import { Route } from '../../../../../../core/enums/route.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-run',
  imports: [ReactiveFormsModule, ButtonComponent, QuizRunQuestionComponent, CountDownComponent],
  templateUrl: './quiz-run.component.html',
  styleUrl: './quiz-run.component.scss',
  providers: [TranslatePipe],
})
export class QuizRunComponent implements OnInit {
  public countDownComponent = viewChild.required(CountDownComponent);

  public response = input.required<QuizToRunResponse>();
  public onFinish = output<QuizRunFinishedEvent>();

  public readonly ButtonStyle = ButtonStyle;

  public isInitialized = false;
  public form!: FormGroup<IQuizRunForm>;
  public questions!: IQuizRunFormOpenQuestion[];
  public durationInSeconds!: number;

  private readonly _router = inject(Router);

  public async ngOnInit(): Promise<void> {
    this.form = QuizRunFormFactory.Create(this.response());
    this.questions = QuizRunQuestionsHelper.Merge(this.form);
    this.durationInSeconds = this.response().duration.getTotalSeconds();
    this.isInitialized = true;
  }

  public async backToList(): Promise<void> {
    await this._router.navigateByUrl(Route.Quizzes);
  }

  public finish(quizRunningPeriod: PeriodModel<Date>): void {
    this.onFinish.emit({
      form: this.form,
      quizRunningPeriod: quizRunningPeriod,
    });
  }

  public finishCounting(): void {
    this.countDownComponent().finish();
  }
}
