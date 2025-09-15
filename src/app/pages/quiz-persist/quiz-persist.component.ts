import { Component, inject, OnInit } from '@angular/core';
import { QuizPersistApiService } from './services/quiz-persist-api.service';
import { AsyncPageComponent } from '../../../../common/components/async-page/async-page.component';
import { AbstractControl, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../common/components/button/button.component';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { isDefined } from '../../../../common/utils/utils';
import { ButtonStyle } from '../../../../common/components/button/enums/style.enum';
import { QuizPersistHeaderComponent } from './components/header/header.component';
import { MenuComponent } from '../../../../common/components/menu/menu.component';
import { MenuButtonComponent } from '../../../../common/components/menu/components/button/menu-button.component';
import { QuizPersistQuestionComponent } from './components/question/question.component';
import { QuizPersistFormGroup } from './form/quiz-persist.form-group';
import { QuizPersistFormFactory } from './factories/quiz-persist-form.factory';
import { FormUtils } from '../../../../common/utils/form.utils';

function collectErrors(control: AbstractControl, path: string[] = []): Record<string, any> {
  const out: Record<string, any> = {};
  if (control.errors) out[path.join('.') || '(group)'] = control.errors;

  if (control instanceof FormGroup) {
    for (const [name, child] of Object.entries(control.controls)) {
      Object.assign(out, collectErrors(child, [...path, name]));
    }
  } else if (control instanceof FormArray) {
    control.controls.forEach((child, i) => {
      Object.assign(out, collectErrors(child, [...path, String(i)]));
    });
  }
  return out;
}

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
    return !isDefined(this.form);
  }

  public readonly ButtonStyle = ButtonStyle;

  public form!: QuizPersistFormGroup;

  private readonly _persistApiService = inject(QuizPersistApiService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  public async ngOnInit(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id')!;
    const response = await this._persistApiService.getDetails(id);
    this.form = QuizPersistFormFactory.Create(response);
  }

  public persist(): void {
    FormUtils.Validate(this.form);
  }
}
