import { QuizPersistConstants } from '../constants/quiz-persist.constants';
import { isEmpty } from '../../../../../common/utils/utils';
import { IQuizPersistFormMultipleChoiceQuestion } from '../interfaces/quiz-persist-form-multiple-choice-question.interface';
import { IQuizPersistFormSingleChoiceQuestion } from '../interfaces/quiz-persist-form-single-choice-question.interface';

export namespace QuizPersistChoiceQuestionsHelper {
  export function RemoveAnswer(
    question: IQuizPersistFormSingleChoiceQuestion | IQuizPersistFormMultipleChoiceQuestion,
    ordinalNumber: number,
  ): void {
    const index = question.answers.controls.findIndex(
      (a) => a.controls.ordinalNumber.value === ordinalNumber,
    );
    question.answers.removeAt(index);

    question.answers.controls.forEach((a, index) =>
      a.controls.ordinalNumber.setValue(index + QuizPersistConstants.MinOrdinalNumber),
    );
  }

  export function GetNextOrdinalNumber(
    question: IQuizPersistFormSingleChoiceQuestion | IQuizPersistFormMultipleChoiceQuestion,
  ): number {
    const ordinalNumbers = question.answers.controls.map((a) => a.controls.ordinalNumber.value);
    return (
      (isEmpty(ordinalNumbers) ? 0 : Math.max(...ordinalNumbers)) + QuizPersistConstants.MinOrdinalNumber
    );
  }
}
