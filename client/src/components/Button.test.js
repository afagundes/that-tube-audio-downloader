import { render, screen } from "@testing-library/react";
import Button from "./Button";

test('render submit button', () => {
    render(<Button text="Send" isSubmit={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.getAttribute('type')).toBe('submit');
});

test('render simple button', () => {
    render(<Button text="Send" isSubmit={false} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.getAttribute('type')).toBe('button');
});

test('active button has a "light" indicator', () => {
    const { container } = render(<Button text="Send" isSubmit={false} active={true} />);

    const indicator = container.getElementsByClassName('animate-ping');

    expect(indicator).toHaveLength(1);
    expect(indicator[0]).toBeInTheDocument();
});

test('inactive button does not has a "light" indicator', () => {
    const { container } = render(<Button text="Send" isSubmit={false} active={false} />);

    const indicator = container.getElementsByClassName('animate-ping');
    expect(indicator).toHaveLength(0);
});

test('loading button displays loading label', () => {
    render(<Button text="Send" isSubmit={false} showLoading={true} />)

    expect(screen.queryByText('Send')).toBe(null);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
})
