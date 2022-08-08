/* https://colorhunt.co/palette/e8e8e8f0545430475e222831 */

export const COLORS = {
    DARKBLUE: '#222831',
    BLUE: '#30475E',
    RED: '#F05454',
    WHITE: '#E8E8E8'
};

export const SIZES = {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    XL: 24,
    XXL: 30
}

export const CUSTOM_BUTTONS = {
    button1: {
        backgroundColor: COLORS.RED
    },
    button2: {
        backgroundColor: 'gray'
    },
    button3: {
        backgroundColor: COLORS.BLUE
    },
    iconButton: {
        width: '50%',
        height: '200px'
    }
}

export const DEFAULT_CONTAINER = {
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    }
}

export const DEFAULT_CONTENT_CONTAINER = {
    contentContainer: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 20
    }
}

export const DEFAULT_BUTTONS_CONTAINER = {
    buttonsContainer: {
        marginVertical: 10
    }    
}

export const TEXT_STYLES = {
    boldText:{
        fontWeight: 'bold',
        color: COLORS.BLUE
    },
    largeTextInput: {
        height: 150,
        textAlign: 'left',
        textAlignVertical: 'top'
    }
}