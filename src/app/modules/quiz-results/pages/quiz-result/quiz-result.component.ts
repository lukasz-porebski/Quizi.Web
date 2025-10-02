import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isDefined } from '@common/utils/utils';
import { Route } from '@app/core/enums/route.enum';
import { AsyncPageComponent } from '@common/components/async-page/async-page.component';
import { ButtonComponent } from '@common/components/button/button.component';
import { ButtonStyle } from '@common/components/button/enums/style.enum';
import { QuizResultApiService } from '@app/modules/quiz-results/pages/quiz-result/api/quiz-result-api.service';
import { QuizResultDetailsResponse } from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details.response';
import { IQuizResultQuestion } from '@app/modules/quiz-results/pages/quiz-result/components/question/interfaces/quiz-result-question.interface';
import { QuizResultQuestionsHelper } from '@app/modules/quiz-results/pages/quiz-result/helpers/quiz-result-questions.helper';
import { QuizResultQuestionComponent } from '@app/modules/quiz-results/pages/quiz-result/components/question/question.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CheckboxComponent } from '@common/components/inputs/checkbox/checkbox.component';
import { TimeSpanUtils } from '@common/utils/time-span.utils';
import { DatePipe } from '@angular/common';
import { DateFormat } from '@common/enums/date-format.enum';
import { sum } from 'remeda';

@Component({
  selector: 'app-quiz-result',
  imports: [
    AsyncPageComponent,
    ButtonComponent,
    QuizResultQuestionComponent,
    CheckboxComponent,
    TranslatePipe,
    DatePipe,
  ],
  templateUrl: './quiz-result.component.html',
  styleUrl: './quiz-result.component.scss',
  providers: [QuizResultApiService, TranslatePipe],
})
export class QuizResultComponent implements OnInit {
  public get isLoading(): boolean {
    return !this.isInitialized || this._isSaving;
  }

  public get isInitialized(): boolean {
    return isDefined(this.response);
  }

  public readonly ButtonStyle = ButtonStyle;
  public readonly DateFormat = DateFormat;

  public response!: QuizResultDetailsResponse;
  public questions!: IQuizResultQuestion[];

  private readonly _quizResultApiService = inject(QuizResultApiService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  private _isSaving = false;

  public async ngOnInit(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.response = await this._quizResultApiService.getDetails(id!);
    this.questions = QuizResultQuestionsHelper.Merge(this.response);
  }

  public getScoredPoints(): number {
    return (
      sum(this.response.openQuestions.map((q) => q.scoredPoints)) +
      sum(this.response.singleChoiceQuestions.map((q) => q.scoredPoints)) +
      sum(this.response.multipleChoiceQuestions.map((q) => q.scoredPoints))
    );
  }

  public getPointsPossibleToGet(): number {
    return (
      sum(this.response.openQuestions.map((q) => q.pointsPossibleToGet)) +
      sum(this.response.singleChoiceQuestions.map((q) => q.pointsPossibleToGet)) +
      sum(this.response.multipleChoiceQuestions.map((q) => q.pointsPossibleToGet))
    );
  }

  public getDuration(): string {
    return (
      TimeSpanUtils.ToTimeSpanByModel(this.response.duration) +
      '/' +
      TimeSpanUtils.ToTimeSpanByModel(this.response.maxDuration)
    );
  }

  public async backToList(): Promise<void> {
    await this._router.navigateByUrl(Route.QuizResults);
  }
}
