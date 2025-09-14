import { FormControl } from '@angular/forms';
import { IQuizPersistFormSingleChoiceQuestionAnswer } from '../../../interfaces/quiz-persist-form-single-choice-question-answer.interface';

export class QuizPersistSingleChoiceQuestionRadioOption {
  public readonly value: number;
  public readonly control: FormControl<string>;

  public constructor(answer: IQuizPersistFormSingleChoiceQuestionAnswer) {
    this.value = answer.no.value!;
    this.control = answer.text;
  }
}
