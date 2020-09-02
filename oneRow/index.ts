type KeyboardRow = Set<string>;

export class Keyboard {
    #rows: Set<KeyboardRow>;
    #characterMap: Map<string, KeyboardRow>
    constructor(rows: Iterable<string>[]) {
        this.#rows = new Set(rows.map(row => new Set(row)));

        const characterMap = new Map();
        for (const row of this.#rows) {
            for (const c of row) {
                if (characterMap.has(c)) {
                    throw new Error(`Character "${c}" registered more than once`);
                }
                characterMap.set(c, row);
            }
        }
        this.#characterMap = characterMap;
    }

    validate(word: string): boolean {
        if (word.length <= 0) {
            return false;
        }

        const row = this.#characterMap.get(word[0]);
        if (!row) {
            return false;
        }

        for (let i = 1; i < word.length; i++) {
            if (!row.has(word[i])) {
                return false;
            }
        }

        return true;
    }

    static byName(keyboardName: string): Keyboard {
        const k =  Keyboard.keyboards.get(keyboardName);
        if (!k) {
            throw new Error(`Unknown keyboard name ${keyboardName}`);
        }
        return k
    }

    // In the examples given here, restricting to alpha characters, but hypothetically
    // should work with any characters.
    private static keyboards = new Map([
        ['querty', new Keyboard([
            'qwertyuiop',
            'asdfghjkl',
            'zxcvbnm'
        ])],
        ['dvorak', new Keyboard([
            'pyfgcrl',
            'aoeuidhtns',
            'qjkxbmwvz'
        ])]
    ])
}
export function oneRow(inputs: string[], keyboard: string|Keyboard = 'querty') : string[] {
    const _keyboard: Keyboard = keyboard instanceof Keyboard ? keyboard : Keyboard.byName(keyboard);
    return inputs.filter(input => _keyboard.validate(input));
}
