export const formatTimeFromSeconds = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const hoursRemainder = seconds / 3600 - Math.floor(hours);
    const minutes = Math.round(hoursRemainder * 60);

    if (minutes === 0 && hours === 0) return '0s';
    if (minutes === 0) return `${hours}h`;
    if (hours === 0) return `${minutes}min`;
    return `${hours}h ${minutes}min`
}