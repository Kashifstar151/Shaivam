import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from '../../../Context/ThemeContext';

const HighlightedText = ({ fontSizeCount, text, highlight, lyrics, screen, ...restProps }) => {
    const { theme } = useContext(ThemeContext);
    if (!text) return null;
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight.split('').join('\\s*')})`, 'gi');
    let key = 0;
    const parts = text.split(regex);

    return (
        <Text
            style={[
                screen !== 'music-player'
                    ? {
                          fontFamily: 'AnekTamil-Bold',
                          fontSize: 14,

                          //   fontWeight: lyrics ? '400' : '700',
                      }
                    : {
                          fontFamily: 'AnekTamil-medium',
                          fontSize: fontSizeCount,
                          lineHeight: 22,
                      },
                {
                    color: restProps?.textColor ? restProps?.textColor : theme.textColor,
                },
            ]}
            {...restProps}
        >
            {parts.map((part, i) =>
                regex.test(part) && part.length > 2 ? (
                    <Text
                        key={key++}
                        style={{
                            backgroundColor: theme.colorscheme === 'dark' ? '#A47300' : '#F8E3B2',
                        }}
                    >
                        {part}
                    </Text>
                ) : (
                    <Text key={key++}>{part}</Text>
                )
            )}
        </Text>
    );
};
export default HighlightedText;
