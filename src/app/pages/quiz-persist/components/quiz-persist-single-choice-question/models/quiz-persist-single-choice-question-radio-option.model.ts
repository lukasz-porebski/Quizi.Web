import { FormControl } from '@angular/forms';
import { IQuizPersistFormChoiceQuestionAnswer } from '../../../interfaces/quiz-persist-form-choice-question-answer.interface';

export class QuizPersistSingleChoiceQuestionRadioOption {
  public readonly value: number;
  public readonly control: FormControl<string>;

  public constructor(answer: IQuizPersistFormChoiceQuestionAnswer) {
    this.value = answer.no.value!;
    this.control = answer.text;
  }
}
