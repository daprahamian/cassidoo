interface QueueObject {
    open: number;
    close: number;
    current: string;
}

export function generateParens(size: number): string[] {
    if (size < 2) {
        return size === 1 ? ['()'] : [];
    }

    const queue: QueueObject[] = [{open: size, close: size, current: ''}];
    const out = new Set<string>();

    while (queue.length > 0) {
        const {open, close, current} = queue.shift() as QueueObject;

        if (open || close) {
            if (open) {
                queue.push({ open: open - 1, close, current: current + '(' });
            }

            if (close > open) {
                queue.push({ open, close: close - 1, current: current + ')' });
            }
        } else {
            out.add(current);
        }
    }

    return [...out];
}
