import type { ReactNode } from 'react';

export default function Button({ children, onClick, type = 'button' }: { children: ReactNode; onClick?: () => void; type?: 'button' | 'submit' | 'reset' }) {
    return (
        <button onClick={onClick} type={type} className="px-4 py-2 rounded bg-accent text-black">
            {children}
        </button>
    );
}
