export class DataGenerator {

    /**
     * Generates a random alphanumeric string of a specified length.
     * @param length The total character count of the output string
     * @returns A random string (e.g., "aB7xK9pL")
     */
    static generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    /**
     * Generates a random numeric string of a specified length.
     * Guaranteed not to start with zero if you need it as a valid integer parse.
     * @param length The number of digits required
     * @returns A string composed purely of digits (e.g., "830571")
     */
    static generateRandomNumbers(length: number): string {
        if (length <= 0) return '';

        const digits = '0123456789';
        const firstDigits = '123456789'; // Prevents leading zeroes if preferred

        // Pick the first digit
        let result = firstDigits.charAt(Math.floor(Math.random() * firstDigits.length));

        // Fill the rest with the length
        for (let i = 1; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            result += digits.charAt(randomIndex);
        }

        return result;
    }

    /**
     * Generates a random valid email structure for testing forms.
     */
    static generateRandomEmail(): string {
        return `test_${this.generateRandomString(8).toLowerCase()}@domain.com`;
    }
}