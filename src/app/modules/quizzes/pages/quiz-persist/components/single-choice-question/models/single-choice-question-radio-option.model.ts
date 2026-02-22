import { FormControl } from '@angular/forms';
import { IQuizPersistFormSingleChoiceQuestionAnswer } from '@app/modules/quizzes/pages/quiz-persist/interfaces/quiz-persist-form-single-choice-question-answer.interface';

export class QuizPersistSingleChoiceQuestionRadioOption {
  public readonly ordinalNumber: number;
  public readonly control: FormControl<string>;

  constructor(answer: IQuizPersistFormSingleChoiceQuestionAnswer) {
    this.ordinalNumber = answer.ordinalNumber.value;
    this.control = answer.text;
  }
}
