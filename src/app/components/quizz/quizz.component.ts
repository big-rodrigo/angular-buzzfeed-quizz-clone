import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

type Question = {
  id: number,
  question: string,
  options: {
    id: number,
    name: string,
    alias: string
  }[]
};

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title: string = "";

  questions: Question[] = [];

  answers: { [key: string]: number } = {};
  answerSelected: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() { }

  ngOnInit(): void {

    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length - 1;

      for (const option in quizz_questions.results) {
        this.answers[option] = 0;
      }
    }

  }

  playerChoose(value: string): void {
    this.answers[value] += 1;
    this.nextStep();
    console.log(this.answers);
  }

  nextStep(): void {
    
    if (this.questionMaxIndex >= this.questionIndex + 1) {
      this.questionIndex += 1;
    } else {
      const finalAnswer: string = this.checkResult();
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  checkResult(): string {

    let maxValueKey = '';
    for (const resultKey in this.answers) {
      if (this.answers[resultKey] > (this.answers[maxValueKey] || 0)) {
        maxValueKey = resultKey;
      }
    }

    return maxValueKey;
  }

}
