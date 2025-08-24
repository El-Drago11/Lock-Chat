export interface defaultCodeType {
    key: string;
    value: string;
}

export const generateDefaultCode = (): defaultCodeType[] => {
    const result: defaultCodeType[] = [];
    let counter = 1;
    
    // Numbers 1-9
    for (let i = 1; i <= 9; i++) {
        result.push({ key: i.toString(), value: counter.toString() });
        counter++;
    }
    
    // Lowercase a-z
    for (let i = 0; i < 26; i++) {
        result.push({ 
            key: String.fromCharCode(97 + i), 
            value: (97 + i).toString() 
        });
        counter++;
    }
    
    // Uppercase A-Z
    for (let i = 0; i < 26; i++) {
        result.push({ 
            key: String.fromCharCode(65 + i), 
            value: (65 + i).toString() 
        });
        counter++;
    }

    //space
    result.push({ 
            key:' ', 
            value: '32'
    });
    
    return result;
};

