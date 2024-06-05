import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from '../../../Context/ThemeContext';

const HighlightedText = ({ text, highlight, lyrics, setSignal, signal }) => {
    const { theme } = useContext(ThemeContext);
    if (!text) return null;
    const [localSearchState, setLocalSearchState] = useState('');
    useEffect(() => {
        if (signal) {
            setLocalSearchState(() => {
                setSignal(!signal);
                return highlight.replace(/\s/g, '');
            });
        }
    }, [highlight]);

    const escapedHighlight = localSearchState.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight.split('').join('\\s*')})`, 'gi');
    let key = 0;
    const parts = text.split(regex);

    return (
        <Text
            style={{
                fontFamily: 'AnekTamil-Bold',
                fontSize: 14,
                color: theme.textColor,
                // fontWeight: lyrics ? '400' : '700',
            }}
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
                    <Text key={i}>{part}</Text>
                )
            )}
        </Text>
    );
};
export default HighlightedText;
