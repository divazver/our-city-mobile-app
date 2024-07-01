import {Colors, Typography} from "react-native-ui-lib";

Colors.loadSchemes({
    light: {
        screenBG: 'transparent',
        textColor: "#001524",
        moonOrSun: Colors.yellow30,
        mountainForeground: Colors.green30,
        mountainBackground: Colors.green50,
        $backgroundSuccess: Colors.green40,
        $backgroundSuccessLight: Colors.green70
    },
    dark: {
        screenBG: Colors.grey10,
        textColor: Colors.white,
        moonOrSun: Colors.grey80,
        mountainForeground: Colors.violet10,
        mountainBackground: Colors.violet20,
        $backgroundSuccess: Colors.green40,
        $backgroundSuccessLight: Colors.green20
    }
});

Typography.loadTypographies({
    h1: {fontSize: 46, fontWeight: '700', lineHeight: 60},
    h2: {fontSize: 36, fontWeight: '700', lineHeight: 48},
    h3: {fontSize: 28, fontWeight: '700', lineHeight: 36},
    h4: {fontSize: 22, fontWeight: '700', lineHeight: 28},
    h5: {fontSize: 18, fontWeight: '700', lineHeight: 24},
    h6: {fontSize: 12, fontWeight: '700', lineHeight: 16},
});

Colors.loadDesignTokens({primaryColor: "#fe9000"});

