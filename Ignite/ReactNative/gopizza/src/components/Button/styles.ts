import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

// import { RectButton } from 'react-native-gesture-handler';

export type Typeprops = 'primary' | 'secondary';

type ContainerProps = {
    type: Typeprops;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    flex: 1;
    max-height: 54px;
    min-height: 54px;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme, type})=> type === 'primary' ? theme.COLORS.SUCCESS_900 : theme.COLORS.PRIMARY_900};   
`

export const Title = styled.Text`
    font-size: 14px;
    ${({theme})=> css`
        color: ${theme.COLORS.TITLE};
        font-family: ${theme.FONTS.TITLE};
    `}
`

export const Load = styled.ActivityIndicator.attrs(({theme})=>({
    color: theme.COLORS.TITLE
}))``;