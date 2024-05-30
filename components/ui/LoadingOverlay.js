import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

function LoadingOverlay({ messages }){
    return(
        <View style = {styles.rootCOntainer}>
            <Text style = {styles.messages}>{messages}</Text>
            <ActivityIndicator size="large" />
        </View>
    );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    rootCOntainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    messages:{
        fontSize: 16,
        MarginBottom: 12,
    },
});