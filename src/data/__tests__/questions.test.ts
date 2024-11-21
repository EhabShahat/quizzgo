import { describe, it, expect } from 'vitest';
import { questions, Question } from '../questions';

describe('Questions Data', () => {
  it('should have the correct structure for each question', () => {
    questions.forEach((question: Question) => {
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('text');
      expect(question).toHaveProperty('options');
      expect(question).toHaveProperty('correct_answer');
      expect(question).toHaveProperty('timeLimit');
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
      
      // Check if correctAnswer is one of the options
      expect(question.options).toContain(question.correct_answer);
      
      // Check if timeLimit is a positive number
      expect(typeof question.timeLimit).toBe('number');
      expect(question.timeLimit).toBeGreaterThan(0);
      
      // Check if type is valid
      expect(['multiple-choice', 'true-false']).toContain(question.type);
    });
  });

  it('should have unique IDs for each question', () => {
    const ids = questions.map(q => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(questions.length);
  });

  it('should have valid time limits', () => {
    questions.forEach((question) => {
      expect(question.timeLimit).toBe(10);
    });
  });

  it('should have correct number of options based on question type', () => {
    questions.forEach((question) => {
      if (question.type === 'true-false') {
        expect(question.options.length).toBe(2);
        expect(question.options).toEqual(['True', 'False']);
      } else {
        expect(question.options.length).toBe(4);
      }
    });
  });
});