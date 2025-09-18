import { Component, inject, OnInit } from '@angular/core';
import { QuizRunApiService } from './services/quiz-run-api.service';
import { AsyncPageComponent } from '../../../../common/components/async-page/async-page.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../common/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { isDefined } from '../../../../common/utils/utils';
import { ButtonStyle } from '../../../../common/components/button/enums/style.enum';
import { QuizRunQuestionComponent } from './components/question/question.component';
import { QuizRunFormFactory } from './factories/quiz-run-form.factory';
import { IQuizRunForm } from './interfaces/quiz-run-form.interface';
import { IQuizRunFormOpenQuestion } from './interfaces/quiz-run-form-question.interface';
import { QuizRunQuestionsHelper } from './helpers/quiz-run-questions.helper';

@Component({
  selector: 'app-quiz-run',
  imports: [AsyncPageComponent, ReactiveFormsModule, ButtonComponent, QuizRunQuestionComponent],
  templateUrl: './quiz-run.component.html',
  styleUrl: './quiz-run.component.scss',
  providers: [QuizRunApiService, TranslatePipe],
})
export class QuizRunComponent implements OnInit {
  public get isLoading(): boolean {
    return !isDefined(this.form) || this._isSaving;
  }

  public readonly ButtonStyle = ButtonStyle;

  public form!: FormGroup<IQuizRunForm>;
  public questions!: IQuizRunFormOpenQuestion[];

  private readonly _quizRunApiService = inject(QuizRunApiService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  private _isSaving = false;

  public async ngOnInit(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    const response = await this._quizRunApiService.getQuizToRun(id!);
    this.form = QuizRunFormFactory.Create(response);
    this.questions = QuizRunQuestionsHelper.Merge(this.form);
  }

  public async persist(): Promise<void> {
    this._isSaving = true;
    // const persisting = this._quizRunApiService.verify();
    //
    // await persisting
    //   .then(() => this._router.navigateByUrl(Route.Quizzes))
    //   .finally(() => (this._isSaving = false));
  }
}
