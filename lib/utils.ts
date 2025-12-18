export function formatDateRange(from?: string, to?: string) {
    if (!from) return to || '';
    return to ? `${from} — ${to}` : from;
}
