import { Component, inject, OnInit } from '@angular/core';
import { QuizPersistApiService } from './api/quiz-persist-api.service';
import { AsyncPageComponent } from '../../../../../../common/components/async-page/async-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../../../common/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { isDefined } from '../../../../../../common/utils/utils';
import { ButtonStyle } from '../../../../../../common/components/button/enums/style.enum';
import { QuizPersistHeaderComponent } from './components/header/header.component';
import { MenuComponent } from '../../../../../../common/components/menu/menu.component';
import { MenuButtonComponent } from '../../../../../../common/components/menu/components/button/menu-button.component';
import { QuizPersistQuestionComponent } from './components/question/question.component';
import { QuizPersistFormGroup } from './form/quiz-persist.form-group';
import { QuizPersistFormFactory } from './factories/quiz-persist-form.factory';
import { FormUtils } from '../../../../../../common/utils/form.utils';
import { MatError } from '@angular/material/form-field';
import { AggregateId } from '../../../../../../common/types/aggregate-id.type';
import { QuizDetailsResponse } from './api/responses/quiz-details.response';
import { Optional } from '../../../../../../common/types/optional.type';
import { QuizPersistRequestFactory } from './factories/quiz-persist-request.factory';
import { Route } from '../../../../core/enums/route.enum';

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
    MatError,
  ],
  templateUrl: './quiz-persist.component.html',
  styleUrl: './quiz-persist.component.scss',
  providers: [QuizPersistApiService, TranslatePipe],
})
export class QuizPersistComponent implements OnInit {
  public get isLoading(): boolean {
    return !this.isInitialized || this._isSaving;
  }

  public get isInitialized(): boolean {
    return isDefined(this.form);
  }

  public readonly ButtonStyle = ButtonStyle;

  public form!: QuizPersistFormGroup;
  public isPreview = false;

  private readonly _persistApiService = inject(QuizPersistApiService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  private _id?: AggregateId;
  private _isSaving = false;

  public async ngOnInit(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    let response: Optional<QuizDetailsResponse> = undefined;

    if (isDefined(id)) {
      this._id = id;
      response = await this._persistApiService.getDetails(id);
      this.isPreview = this._activatedRoute.snapshot.routeConfig?.path?.includes(Route.QuizPreview) ?? false;
    }

    this.form = QuizPersistFormFactory.Create(response);
  }

  public async backToList(): Promise<void> {
    await this._router.navigateByUrl(Route.Quizzes);
  }

  public async persist(): Promise<void> {
    FormUtils.Validate(this.form);
    if (this.form.invalid) {
      return;
    }

    this._isSaving = true;
    const persisting = isDefined(this._id)
      ? this._persistApiService.update(QuizPersistRequestFactory.CreateForUpdate(this._id, this.form))
      : this._persistApiService.create(QuizPersistRequestFactory.CreateForCreate(this.form));

    await persisting
      .then(() => this._router.navigateByUrl(Route.Quizzes))
      .finally(() => (this._isSaving = false));
  }
}
