import { Component, inject, input, OnInit, output } from '@angular/core';
import { QuizRunOpenQuestionsVerificationApiService } from '@app/modules/quizzes/pages/quiz-run/pages/open-questions-verification/api/quiz-run-open-questions-verification-api.service';
import { QuizRunOpenQuestionFormControl } from '@app/modules/quizzes/pages/quiz-run/pages/run/form/quiz-run-open-question-form.control';
import { FormArray, FormsModule } from '@angular/forms';
import { AggregateId } from '@common/types/aggregate-id.type';
import { QuizRunOpenQuestionVerificationFormControl } from '@app/modules/quizzes/pages/quiz-run/pages/open-questions-verification/form/quiz-run-open-question-verification.form-control';
import { QuizRunOpenQuestionVerificationComponent } from '@app/modules/quizzes/pages/quiz-run/pages/open-questions-verification/components/question-verification/quiz-run-open-question-verification.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '@common/components/button/button.component';
import { isDefined } from '@common/utils/utils';

@Component({
  selector: 'app-quiz-run-open-questions-verification',
  imports: [QuizRunOpenQuestionVerificationComponent, TranslatePipe, ButtonComponent, FormsModule],
  templateUrl: './quiz-run-open-questions-verification.component.html',
  styleUrl: './quiz-run-open-questions-verification.component.scss',
  providers: [QuizRunOpenQuestionsVerificationApiService, TranslatePipe],
})
export class QuizRunOpenQuestionsVerificationComponent implements OnInit {
  public get isInitialized(): boolean {
    return isDefined(this.form);
  }

  public quizId = input.required<AggregateId>();
  public questions = input.required<FormArray<QuizRunOpenQuestionFormControl>>();
  public onFinish = output<FormArray<QuizRunOpenQuestionVerificationFormControl>>();

  public form!: FormArray<QuizRunOpenQuestionVerificationFormControl>;

  private readonly _openQuestionsVerificationApiService = inject(QuizRunOpenQuestionsVerificationApiService);

  public async ngOnInit(): Promise<void> {
    const correctOpenQuestionsAnswer = await this._openQuestionsVerificationApiService.getOpenQuestionsAnswer(
      this.quizId(),
    );
    this.form = new FormArray(
      this.questions()
        .controls.sort((q) => q.ordinalNumber)
        .map((q) => {
          const answer = correctOpenQuestionsAnswer.find((a) => a.no === q.response.no);
          return new QuizRunOpenQuestionVerificationFormControl(q.response, answer!.text, q.value);
        }),
    );
  }
}
