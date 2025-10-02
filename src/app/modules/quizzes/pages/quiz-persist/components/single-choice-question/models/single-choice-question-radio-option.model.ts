import { FormControl } from '@angular/forms';
import { IQuizPersistFormSingleChoiceQuestionAnswer } from '../../../interfaces/quiz-persist-form-single-choice-question-answer.interface';

export class QuizPersistSingleChoiceQuestionRadioOption {
  public readonly ordinalNumber: number;
  public readonly control: FormControl<string>;

  public constructor(answer: IQuizPersistFormSingleChoiceQuestionAnswer) {
    this.ordinalNumber = answer.ordinalNumber.value;
    this.control = answer.text;
  }
}
