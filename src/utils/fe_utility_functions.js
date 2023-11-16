export function colorToHex(colorName) {

    // Return a default color if the mock item doesn't have a color attribute
    if (!colorName) {
        return '000000';
    }

    // Define a map of main colors and their hexadecimal values
    const colorMap = {
        red: 'ff0000',
        green: '00ff00',
        blue: '0000ff',
        yellow: 'ffff00',
        orange: 'ffa500',
        purple: '800080',
        pink: 'ffc0cb',
        brown: 'a52a2a',
        grey: '808080',
        black: '000000',
        white: 'ffffff',
    };

    // Convert color name to lowercase for case-insensitive matching
    const lowerCaseColorName = colorName.toLowerCase();

    // Check if the color name is in the map
    if (lowerCaseColorName in colorMap) {
        return colorMap[lowerCaseColorName];
    } else {
        // Return a default color if the input is not recognized
        return '000000';
    }
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}