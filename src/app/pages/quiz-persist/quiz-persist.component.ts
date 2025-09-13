import { Component, inject, OnInit } from '@angular/core';
import { QuizPersistApiService } from './services/quiz-persist-api.service';
import { AsyncPageComponent } from '../../../../common/components/async-page/async-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizPersistContext } from './contexts/quiz-persist.context';
import { ButtonComponent } from '../../../../common/components/button/button.component';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { isDefined } from '../../../../common/utils/utils';
import { ButtonStyle } from '../../../../common/components/button/enums/style.enum';
import { QuizPersistHeaderComponent } from './components/quiz-persist-header/quiz-persist-header.component';
import { MenuComponent } from '../../../../common/components/menu/menu.component';
import { MenuButtonComponent } from '../../../../common/components/menu/components/button/menu-button.component';
import { QuizPersistQuestionsHelper } from './helpers/quiz-persist-questions.helper';
import { QuizPersistFormQuestion } from './types/quiz-persist-form-question.type';
import { QuizPersistQuestionComponent } from './components/quiz-persist-question/quiz-persist-question.component';

@Component({
  selector: 'app-quiz-persist',
  imports: [
    AsyncPageComponent,
    ReactiveFormsModule,
    ButtonComponent,
    QuizPersistHeaderComponent,
    MenuComponent,
    MenuButtonComponent,
    TranslatePipe,
    QuizPersistQuestionComponent,
  ],
  templateUrl: './quiz-persist.component.html',
  styleUrl: './quiz-persist.component.scss',
  providers: [QuizPersistApiService, TranslatePipe],
})
export class QuizPersistComponent implements OnInit {
  public get isLoading(): boolean {
    return !isDefined(this.context);
  }

  public get questions(): QuizPersistFormQuestion[] {
    return QuizPersistQuestionsHelper.Merge(this.context);
  }

  public readonly ButtonStyle = ButtonStyle;

  public context!: QuizPersistContext;

  private readonly _persistApiService = inject(QuizPersistApiService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  public async ngOnInit(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id')!;
    const response = await this._persistApiService.getDetails(id);
    this.context = new QuizPersistContext(response);
  }
}
