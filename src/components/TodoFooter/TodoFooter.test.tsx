import { render, screen, fireEvent } from '@testing-library/react';
import TodoFooter from './TodoFooter';
import type { TFilter } from '../../types';

describe('TodoFooter', () => {
    const mockSetFilter = jest.fn();
    const mockDeleteCompleted = jest.fn();
    const defaultProps = {
        filter: 'all' as TFilter,
        setFilter: mockSetFilter,
        count: 5,
        deleteCompleted: mockDeleteCompleted,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with item count', () => {
        render(<TodoFooter {...defaultProps} />);

        expect(screen.getByText('5 items left')).toBeInTheDocument();
        expect(screen.getByText('all')).toBeInTheDocument();
        expect(screen.getByText('active')).toBeInTheDocument();
        expect(screen.getByText('completed')).toBeInTheDocument();
        expect(screen.getByText('Clear completed')).toBeInTheDocument();
    });

    it('shows "item" when count is 1', () => {
        render(<TodoFooter {...defaultProps} count={1} />);
        expect(screen.getByText('1 item left')).toBeInTheDocument();
    });

    it('applies active class to current filter', () => {
        render(<TodoFooter {...defaultProps} filter="active" />);
        const activeButton = screen.getByText('active');
        const allButton = screen.getByText('all');

        expect(activeButton.parentElement).toHaveAttribute('data-active', 'true');
        expect(allButton.parentElement).toHaveAttribute('data-active', 'false');
    });

    it('calls setFilter when filter button is clicked', () => {
        render(<TodoFooter {...defaultProps} />);

        fireEvent.click(screen.getByText('active'));
        expect(mockSetFilter).toHaveBeenCalledWith('active');

        fireEvent.click(screen.getByText('completed'));
        expect(mockSetFilter).toHaveBeenCalledWith('completed');
    });

    it('calls deleteCompleted when clear button is clicked', () => {
        render(<TodoFooter {...defaultProps} />);

        fireEvent.click(screen.getByText('Clear completed'));
        expect(mockDeleteCompleted).toHaveBeenCalledTimes(1);
    });

    it('renders all filter buttons', () => {
        render(<TodoFooter {...defaultProps} />);
        const filters: TFilter[] = ['all', 'active', 'completed'];

        filters.forEach(filter => {
            expect(screen.getByText(filter)).toBeInTheDocument();
        });
    });
});
