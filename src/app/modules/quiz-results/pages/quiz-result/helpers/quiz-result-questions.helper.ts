import { sortBy } from 'remeda';
import { IQuizResultQuestion } from '@app/modules/quiz-results/pages/quiz-result/components/question/interfaces/quiz-result-question.interface';
import { QuizResultDetailsResponse } from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details.response';
import { QuizQuestionType } from '@app/core/enums/quiz-question-type.enum';

export namespace QuizResultQuestionsHelper {
  export function Merge(response: QuizResultDetailsResponse): IQuizResultQuestion[] {
    const result: IQuizResultQuestion[] = [];
    response.openQuestions.forEach((c) => {
      result.push({
        type: QuizQuestionType.Open,
        response: c,
      });
    });

    response.singleChoiceQuestions.forEach((c) => {
      result.push({
        type: QuizQuestionType.SingleChoice,
        response: c,
      });
    });

    response.multipleChoiceQuestions.forEach((c) => {
      result.push({
        type: QuizQuestionType.MultipleChoice,
        response: c,
      });
    });

    return sortBy(result, (r) => r.response.ordinalNumber);
  }
}
