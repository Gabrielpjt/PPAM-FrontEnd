import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

function AuthForm ({ isLogin, onSubmit, credentialsInvalid = {} }) {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
    const [enteredNamaToko, setEnteredNamaToko] = useState('');
    const [enteredAlamatToko, setEnteredAlamatToko] = useState('');
    const [enteredNomorTelepon, setEnteredNomorTelepon] = useState('');
    
    const {
        nama: emailsInvalid,
        confirmNama: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordDontMatch,
    } = credentialsInvalid;

    function updateInputValueHandler(inputType, enteredValue) {
        switch(inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
            case 'namaToko':
                setEnteredNamaToko(enteredValue);
                break;
            case 'alamatToko':
                setEnteredAlamatToko(enteredValue);
                break;
            case 'nomorTelepon':
                setEnteredNomorTelepon(enteredValue);
                break;
            default:
                break;
        }
    }

    function submitHandler() {
        onSubmit({
            nama: enteredEmail,
            confirmNama: enteredConfirmEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
            nama_toko: enteredNamaToko,
            alamat: enteredAlamatToko,
            no_telp: enteredNomorTelepon,
            foto: ''
        });
    }

    return (
        <KeyboardAvoidingView 
            style={styles.keyboardAvoidingView} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.form}>
                    <View>
                        <Input 
                            label="Username"
                            keyboardType="email-address"
                            onUpdateValue={(value) => updateInputValueHandler('email', value)}
                            value={enteredEmail}
                            isInvalid={emailsInvalid} 
                        />
                        {!isLogin && (
                            <Input
                                label="Confirm Username"
                                secure={false}
                                onUpdateValue={(value) => updateInputValueHandler('confirmEmail', value)}
                                value={enteredConfirmEmail}
                                isInvalid={emailsDontMatch}
                            />
                        )}
                        <Input
                            label="Password"
                            secure={true}
                            keyboardType="default"
                            onUpdateValue={(value) => updateInputValueHandler('password', value)}
                            value={enteredPassword}
                            isInvalid={passwordIsInvalid}
                        />
                        {!isLogin && (
                            <Input
                                label="Confirm Password"
                                secure={true}
                                onUpdateValue={(value) => updateInputValueHandler('confirmPassword', value)}
                                value={enteredConfirmPassword}
                                isInvalid={passwordDontMatch}
                            />
                        )}
                        {!isLogin && (
                            <Input
                                label="Nama Toko"
                                secure={false}
                                onUpdateValue={(value) => updateInputValueHandler('namaToko', value)}
                                value={enteredNamaToko}
                            />
                        )}
                        {!isLogin && (
                            <Input
                                label="Alamat Toko"
                                secure={false}
                                onUpdateValue={(value) => updateInputValueHandler('alamatToko', value)}
                                value={enteredAlamatToko}
                            />
                        )}
                        {!isLogin && (
                            <Input
                                label="No. Telepon"
                                secure={false}
                                onUpdateValue={(value) => updateInputValueHandler('nomorTelepon', value)}
                                value={enteredNomorTelepon}
                            />
                        )}
                        <View style={styles.button}>
                            <Button onPress={submitHandler}>
                                {isLogin ? 'Log In' : 'Sign Up'}
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default AuthForm;

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    button: {
        marginTop: 25,
    },
});
