import { Component, input } from '@angular/core';
import { NumberInputComponent } from '../../../../../../common/components/inputs/number/number.component';
import { TextInputComponent } from '../../../../../../common/components/inputs/text/text.component';
import { QuizPersistContext } from '../../contexts/quiz-persist.context';

@Component({
  selector: 'app-quiz-persist-header',
  imports: [NumberInputComponent, TextInputComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class QuizPersistHeaderComponent {
  public context = input.required<QuizPersistContext>();
}
