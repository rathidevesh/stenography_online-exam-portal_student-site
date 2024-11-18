import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const StudentInfo = ({student}) => {
    console.log(student)
    const styles = StyleSheet.create({
        page: {
            background: 'white',
            paddingTop: '2cm',
            paddingBottom: '2cm',
            paddingLeft: '2cm',
            paddingRight: '2cm',
            backgroundColor: 'rgba(203, 218, 233, 0.438)'
          },
        view: {
            width: 'fit-content',
            padding: '0em 1em 2em',
            margin: '3em auto 1em',
            border: '1px solid black',
            outline: '3px solid black',
            outlineOffset: '5px',
          },
        header: {
          marginBottom: 20,
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          textDecoration: 'underline'
        },
        section: {
          flexDirection: 'row',
          marginBottom: 10,
        },
        label: {
          width: 150,
          fontWeight: 'bold',
          textTransform: 'uppercase',
        },
        value: {
          flex: 1,
        },
    });
    if(!student) {
        return <p>You cannot access this page</p>
    }
    return (
        <Document>
            <Page style={styles.page}>
                <View>
                    <Text style={styles.header}>Admit Card</Text>
                    <View style={styles.section}>
                        <Text style={styles.label}>First Name: </Text>
                        <Text style={styles.value}>{student.firstName}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Last Name: </Text>
                        <Text style={styles.value}>{student.lastName}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Date Of Birth: </Text>
                        <Text style={styles.value}>{student.dateOfBirth}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>City: </Text>
                        <Text style={styles.value}>{student.city}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Email: </Text>
                        <Text style={styles.value}>{student.email}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Exam: </Text>
                        <Text style={styles.value}>{student.examId}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default StudentInfo