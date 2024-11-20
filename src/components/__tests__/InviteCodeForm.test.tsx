import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InviteCodeForm from '../InviteCodeForm';
import { vi } from 'vitest';

// Mock the useToast hook
vi.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('InviteCodeForm', () => {
  it('renders correctly', () => {
    render(<InviteCodeForm />);
    expect(screen.getByPlaceholderText('Enter your invite code')).toBeInTheDocument();
    expect(screen.getByText('Start Quiz')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<InviteCodeForm />);
    const input = screen.getByPlaceholderText('Enter your invite code');
    fireEvent.change(input, { target: { value: 'TEST123' } });
    expect(input).toHaveValue('TEST123');
  });

  it('displays admin access button', () => {
    render(<InviteCodeForm />);
    expect(screen.getByText('Admin Access')).toBeInTheDocument();
  });
});