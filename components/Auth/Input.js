import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/style';

function Input({
    label,
    keyboardType,
    secure,
    onUpdateValue,
    value,
    isInvalid
}){
    return(
        <View style={styles.inputContainer}>
            <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
                {label}
            </Text>
            <TextInput 
                style={[styles.input, isInvalid && styles.inputInvalid]}
                autoCapitalize="none"
                keyboardType={keyboardType}
                secureTextEntry={secure} // menggunakan secureTextEntry bukan secure
                onChangeText={onUpdateValue}
                value={value}
            />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
    },
    input: {
        borderBottomWidth: 1, // Mengubah input menjadi garis
        paddingVertical: 8,
        paddingHorizontal: 6,
        fontSize: 16,
    },
    inputInvalid: {
        borderBottomColor: Colors.error100, // Mengubah warna garis saat input tidak valid
    },
    label: {
        color: "#1c1b1d",
        fontSize: 20,
        textAlign: "center", // Mengubah posisi label menjadi di tengah secara horizontal
    },
    labelInvalid: {
        color: Colors.error500, // Mengubah warna label saat input tidak valid
    },
});
