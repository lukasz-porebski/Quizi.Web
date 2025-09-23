import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isDefined } from '../../../../common/utils/utils';
import { Route } from '../../core/enums/route.enum';
import { AsyncPageComponent } from '../../../../common/components/async-page/async-page.component';
import { ButtonComponent } from '../../../../common/components/button/button.component';
import { ButtonStyle } from '../../../../common/components/button/enums/style.enum';
import { QuizResultApiService } from './services/quiz-result-api.service';
import { QuizResultDetailsResponse } from './models/responses/quiz-result-details.response';
import { IQuizResultQuestion } from './components/question/interfaces/quiz-result-question.interface';
import { QuizResultQuestionsHelper } from './helpers/quiz-result-questions.helper';
import { QuizResultQuestionComponent } from './components/question/question.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-quiz-result',
  imports: [AsyncPageComponent, ButtonComponent, QuizResultQuestionComponent],
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

  public async backToList(): Promise<void> {
    await this._router.navigateByUrl(Route.Quizzes);
  }

  protected readonly ButtonStyle = ButtonStyle;
}
