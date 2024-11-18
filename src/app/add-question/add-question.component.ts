import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  questionForm!: FormGroup;
  submissionSuccess: boolean = false;
  submissionError: boolean = false;
  adminId!: number;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadAdminId();
  }

  initializeForm(): void {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      reponseCorrecte: ['', [Validators.required]], // Bonne réponse
      reponses: this.fb.array([this.createReponseField(), this.createReponseField()])
    });
  }

  loadAdminId(): void {
    const admin = this.adminService.getAuthenticatedAdmin();
    if (admin && admin.id) {
      this.adminId = admin.id; // Stocker l'ID de l'admin
    } else {
      console.error('Admin non authentifié ou ID manquant.');
    }
  }

  createReponseField(): FormGroup {
    return this.fb.group({
      reponse: ['', [Validators.required]]
    });
  }

  get reponses(): FormArray {
    return this.questionForm.get('reponses') as FormArray;
  }

  addReponseField(): void {
    this.reponses.push(this.createReponseField());
  }

  removeReponseField(index: number): void {
    if (this.reponses.length > 2) {
      this.reponses.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const formData = this.questionForm.value;

      const questionDTO = {
        adminId: this.adminId,
        question: formData.question,
        reponseCorrecte: formData.reponseCorrecte,
        reponses: formData.reponses.map((r: any) => r.reponse),
      };

      this.questionService.createQuestion(questionDTO).subscribe(
        () => {
          this.submissionSuccess = true;
          this.submissionError = false;
          this.questionForm.reset(); // Réinitialise le formulaire
        },
        (error) => {
          console.error('Erreur lors de la création de la question :', error);
          this.submissionSuccess = false;
          this.submissionError = true;
        }
      );
    }
  }
}
