import { Text, View } from "react-native";
import { colors } from "../../../Helpers";
const HighlightedText = ({ text, highlight, lyrics }) => {
    if (!text) return null;
    highlight = highlight.replace(/\s/g, '');
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(
        `(${escapedHighlight.split("").join("\\s*")})`,
        "gi"
    );
    let key = 0;
    const parts = text.split(regex);

    return (
        <Text style={{
            fontFamily: 'AnekTamil-Bold',
            fontSize: 14,
            color: colors.screenTheme.textColor,
            fontWeight: lyrics ? '400' : '700',
        }}>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <Text key={key++} style={{ backgroundColor: "yellow" }}>
                        {part}
                    </Text>
                ) : (
                    part
                )
            )}
        </Text>
    );
};
export default HighlightedText