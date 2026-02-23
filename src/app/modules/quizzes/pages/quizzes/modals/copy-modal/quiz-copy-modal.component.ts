import { Component, inject } from '@angular/core';
import { ModalComponent } from '@common/components/modal/modal.component';
import { TextInputComponent } from '@common/components/inputs/text/text.component';
import { TextInputType } from '@common/components/inputs/text/enums/type.enum';
import { FormControl, Validators } from '@angular/forms';
import { ButtonComponent } from '@common/components/button/button.component';
import { QuizzesListApiService } from '@app/modules/quizzes/pages/quizzes/api/quizzes-list-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '@common/services/notification.service';
import { AsyncPageComponent } from '@common/components/async-page/async-page.component';
import { TextInputValidator } from '@common/components/inputs/text/validators/text-input.validator';
import type { Guid } from '@common/types/guid.type';
import { ButtonStyle } from '@common/components/button/enums/style.enum';

@Component({
  selector: 'app-quiz-copy-modal',
  imports: [ModalComponent, TextInputComponent, ButtonComponent, AsyncPageComponent],
  templateUrl: './quiz-copy-modal.component.html',
  styleUrl: './quiz-copy-modal.component.scss',
  providers: [QuizzesListApiService],
})
export class QuizCopyModalComponent {
  private readonly _dialogRef = inject(MatDialogRef<QuizCopyModalComponent>);
  private readonly _apiService = inject(QuizzesListApiService);
  private readonly _notificationService = inject(NotificationService);

  public readonly ButtonStyle = ButtonStyle;
  public readonly TextInputType = TextInputType;
  public readonly code = new FormControl<Guid>('', [Validators.required, TextInputValidator.Guid()]);

  public isLoading = false;

  public cancel(): void {
    this._dialogRef.close();
  }

  public async copy(): Promise<void> {
    if (this.code.invalid) {
      return;
    }

    this.isLoading = true;
    return this._apiService
      .copy(this.code.value!)
      .then(() => {
        this._notificationService.success('COPIED_QUIZ');
        this._dialogRef.close(true);
      })
      .finally(() => (this.isLoading = false));
  }
}
