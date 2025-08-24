export interface defaultCodeType {
    key: string;
    value: string;
}

export const generateDefaultCode = (): defaultCodeType[] => {
    const result: defaultCodeType[] = [];
    
    // Numbers 0-9
    for (let i = 0; i <= 9; i++) {
        result.push({ key: i.toString(), value: (48 + i).toString() });
    }
    
    // Lowercase a-z
    for (let i = 0; i < 26; i++) {
        result.push({ 
            key: String.fromCharCode(97 + i), 
            value: (97 + i).toString() 
        });
    }
    
    // Uppercase A-Z
    for (let i = 0; i < 26; i++) {
        result.push({ 
            key: String.fromCharCode(65 + i), 
            value: (65 + i).toString() 
        });
    }

    // Whitespace characters
    const whitespaceChars = [
        { char: '\t', code: 9 },   // Tab
        { char: '\n', code: 10 },  // Line feed (newline)
        { char: '\r', code: 13 },  // Carriage return
        { char: ' ', code: 32 },   // Space
    ];

    // Special characters and symbols
    const specialChars = [
        { char: '!', code: 33 },   // Exclamation mark
        { char: '"', code: 34 },   // Double quote
        { char: '#', code: 35 },   // Hash
        { char: '$', code: 36 },   // Dollar
        { char: '%', code: 37 },   // Percent
        { char: '&', code: 38 },   // Ampersand
        { char: "'", code: 39 },   // Single quote
        { char: '(', code: 40 },   // Left parenthesis
        { char: ')', code: 41 },   // Right parenthesis
        { char: '*', code: 42 },   // Asterisk
        { char: '+', code: 43 },   // Plus
        { char: ',', code: 44 },   // Comma
        { char: '-', code: 45 },   // Minus/Hyphen
        { char: '.', code: 46 },   // Period
        { char: '/', code: 47 },   // Forward slash
        { char: ':', code: 58 },   // Colon
        { char: ';', code: 59 },   // Semicolon
        { char: '<', code: 60 },   // Less than
        { char: '=', code: 61 },   // Equal
        { char: '>', code: 62 },   // Greater than
        { char: '?', code: 63 },   // Question mark
        { char: '@', code: 64 },   // At symbol
        { char: '[', code: 91 },   // Left bracket
        { char: '\\', code: 92 },  // Backslash
        { char: ']', code: 93 },   // Right bracket
        { char: '^', code: 94 },   // Caret
        { char: '_', code: 95 },   // Underscore
        { char: '`', code: 96 },   // Backtick
        { char: '{', code: 123 },  // Left brace
        { char: '|', code: 124 },  // Pipe
        { char: '}', code: 125 },  // Right brace
        { char: '~', code: 126 },  // Tilde
    ];

    // Add whitespace characters
    whitespaceChars.forEach(({ char, code }) => {
        result.push({ key: char, value: code.toString() });
    });

    // Add special characters
    specialChars.forEach(({ char, code }) => {
        result.push({ key: char, value: code.toString() });
    });
    
    return result;
};
