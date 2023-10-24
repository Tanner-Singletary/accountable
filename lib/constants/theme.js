const palette = {
    lightRed: '#EDB9A8',
    red: '#FF5733',
    lightGreen: '#BDEDA8',
    green: '#53C623',
    black: '#202121',
    offWhite: '#F6F6F6',
    white: '#FFFFFFFF',
}

export const theme = {
    colors: {
        background: palette.black,
        foreground: palette.offWhite,
        primary: palette.white,
        veryGood: palette.green,
        good: palette.lightGreen,
        veryBad: palette.red,
        bad: palette.lightRed,
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24
    },
    textVariants: {
        header: {
            fontSize: 36,
            fontWeight: 'bold'
        },
        body: {
            fontSize: 16
        }
    }
}

export const darkTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        background: palette.black,
        foreground: palette.offWhite
    }
}