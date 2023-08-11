export class FormatterHelper {
    static formatShortDate(date: Date): string {
        const day = this.formatDay(date.getDate());
        const month = this.formatDay(date.getMonth() + 1);
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    private static formatDay(day: number): string {
        return day < 10 ? `0${day}` : day.toString();
    }
}
