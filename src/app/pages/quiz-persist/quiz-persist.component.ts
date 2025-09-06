import { Component, inject, OnInit } from '@angular/core';
import { QuizPersistApiService } from './services/quiz-persist-api.service';
import { AsyncPageComponent } from '../../../../common/components/async-page/async-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../../../common/components/inputs/text/text.component';
import { QuizPersistContext } from './contexts/quiz-persist.context';
import { ButtonComponent } from '../../../../common/components/button/button.component';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { isDefined } from '../../../../common/utils/utils';

@Component({
  selector: 'app-quiz-persist',
  imports: [
    AsyncPageComponent,
    ReactiveFormsModule,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './quiz-persist.component.html',
  styleUrl: './quiz-persist.component.scss',
  providers: [QuizPersistApiService, TranslatePipe],
})
export class QuizPersistComponent implements OnInit {
  public get isLoading(): boolean {
    return !isDefined(this.context);
  }

  public context!: QuizPersistContext;

  private readonly _persistApiService = inject(QuizPersistApiService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  public async ngOnInit(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id')!;
    const response = await this._persistApiService.getDetails(id);
    this.context = new QuizPersistContext(response);
  }
}
