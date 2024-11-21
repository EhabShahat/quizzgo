import { describe, it, expect } from 'vitest';
import type { Question } from '../questions';

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "What is 2+2?",
    options: ["3", "4", "5", "6"],
    correct_answer: "4",
    time_limit: 10,
    type: "multiple-choice"
  },
  {
    id: 2,
    text: "Is the Earth round?",
    options: ["True", "False"],
    correct_answer: "True",
    time_limit: 10,
    type: "true-false"
  }
];

describe('Questions Data', () => {
  it('should have the correct structure for each question', () => {
    sampleQuestions.forEach((question: Question) => {
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('text');
      expect(question).toHaveProperty('options');
      expect(question).toHaveProperty('correct_answer');
      expect(question).toHaveProperty('time_limit');
      expect(question).toHaveProperty('type');
      
      // Check if id is a number
      expect(typeof question.id).toBe('number');
      
      // Check if text is a non-empty string
      expect(typeof question.text).toBe('string');
      expect(question.text.length).toBeGreaterThan(0);
      
      // Check if options array length matches question type
      expect(Array.isArray(question.options)).toBe(true);
      if (question.type === 'true-false') {
        expect(question.options.length).toBe(2);
        expect(question.options).toEqual(['True', 'False']);
      } else {
        expect(question.options.length).toBe(4);
      }
      
      // Check if correct_answer is one of the options
      expect(question.options).toContain(question.correct_answer);
      
      // Check if time_limit is a positive number
      expect(typeof question.time_limit).toBe('number');
      expect(question.time_limit).toBeGreaterThan(0);
      
      // Check if type is valid
      expect(['multiple-choice', 'true-false']).toContain(question.type);
    });
  });

  it('should have unique IDs for each question', () => {
    const ids = sampleQuestions.map(q => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(sampleQuestions.length);
  });

  it('should have valid time limits', () => {
    sampleQuestions.forEach((question) => {
      expect(question.time_limit).toBe(10);
    });
  });

  it('should have correct number of options based on question type', () => {
    sampleQuestions.forEach((question) => {
      if (question.type === 'true-false') {
        expect(question.options.length).toBe(2);
        expect(question.options).toEqual(['True', 'False']);
      } else {
        expect(question.options.length).toBe(4);
      }
    });
  });
});