import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { QuizzesListApiService } from '@app/modules/quizzes/pages/quizzes/api/quizzes-list-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import type { Guid } from 'lp-common';
import {
  AsyncPageComponent,
  ButtonComponent,
  ButtonStyle,
  ModalComponent,
  NotificationService,
  TextInputComponent,
  TextInputType,
  TextInputValidator,
} from 'lp-common';

@Component({
  selector: 'app-quiz-copy-modal',
  imports: [AsyncPageComponent, ModalComponent, ButtonComponent, TextInputComponent],
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
