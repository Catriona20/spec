import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal,
  SafeAreaView, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';

type Student = {
  id: string;
  name: string;
  rollNo: string;
  gender: 'male' | 'female';
  attendancePercentage: number;
  department: string;
  email: string;
  phone: string;
  batch: string;
};

const students: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    rollNo: 'CS2021001',
    gender: 'male',
    attendancePercentage: 85,
    department: 'Computer Science',
    email: 'john.smith@example.edu',
    phone: '+91 9876543210',
    batch: '2021-2025'
  },
  {
    id: '2',
    name: 'Emma Wilson',
    rollNo: 'CS2021002',
    gender: 'female',
    attendancePercentage: 62,
    department: 'Computer Science',
    email: 'emma.wilson@example.edu',
    phone: '+91 9876543211',
    batch: '2021-2025'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    rollNo: 'CS2021003',
    gender: 'male',
    attendancePercentage: 73,
    department: 'Computer Science',
    email: 'michael.johnson@example.edu',
    phone: '+91 9876543212',
    batch: '2021-2025'
  },
  {
    id: '4',
    name: 'Sophia Garcia',
    rollNo: 'CS2021004',
    gender: 'female',
    attendancePercentage: 45,
    department: 'Computer Science',
    email: 'sophia.garcia@example.edu',
    phone: '+91 9876543213',
    batch: '2021-2025'
  },
  {
    id: '5',
    name: 'Jacob Miller',
    rollNo: 'CS2021005',
    gender: 'male',
    attendancePercentage: 58,
    department: 'Computer Science',
    email: 'jacob.miller@example.edu',
    phone: '+91 9876543214',
    batch: '2021-2025'
  }
];

const AbsenteesScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const openStudentDetails = (student: Student) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const closeStudentDetails = () => {
    setModalVisible(false);
  };

  const renderStudentItem = ({ item }: { item: Student }) => (
    <TouchableOpacity
      style={styles.studentItem}
      onPress={() => openStudentDetails(item)}
    >
     <Image
  source={
    item.gender === 'male'
      ? require('../assets/male-avatar.png')
      : require('../assets/female-avatar.png')
  }
  style={styles.avatar}
/>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentRollNo}>{item.rollNo}</Text>
      </View>
      <View
        style={[
          styles.attendanceIndicator,
          item.attendancePercentage < 75 ? styles.lowAttendance : styles.goodAttendance
        ]}
      />
    </TouchableOpacity>
  );

  const chartConfig = {
    backgroundGradientFrom: "#3E3D53",
    backgroundGradientTo: "#3E3D53",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#5A4DBC" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CS2343 - Operating Systems</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Absentees</Text>
        <Text style={styles.subtitle}>Today's Class: 08:00 AM - 09:00 AM</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>32</Text>
            <Text style={styles.statLabel}>Total Students</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Absent Today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>84%</Text>
            <Text style={styles.statLabel}>Overall Attendance</Text>
          </View>
        </View>

        <FlatList
          data={students}
          renderItem={renderStudentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>

      {selectedStudent && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeStudentDetails}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeStudentDetails}>
                <Ionicons name="close" size={24} color="#5A4DBC" />
              </TouchableOpacity>

              <View style={styles.studentHeader}>
                <Image
                  source={
                    selectedStudent.gender === 'male'
                      ? require('../assets/male-avatar.png')
                      : require('../assets/female-avatar.png')
                  }
                  style={styles.modalAvatar}
                />
                <View>
                  <Text style={styles.modalStudentName}>{selectedStudent.name}</Text>
                  <Text style={styles.modalStudentRoll}>{selectedStudent.rollNo}</Text>
                </View>
              </View>

              <View style={styles.attendanceChartContainer}>
                <Text style={styles.chartTitle}>Attendance Overview</Text>
                <PieChart
                  data={[
                    {
                      name: "Present",
                      population: selectedStudent.attendancePercentage,
                      color: "#5A4DBC",
                      legendFontColor: "#FFFFFF",
                      legendFontSize: 12
                    },
                    {
                      name: "Absent",
                      population: 100 - selectedStudent.attendancePercentage,
                      color: "#FF6384",
                      legendFontColor: "#FFFFFF",
                      legendFontSize: 12
                    }
                  ]}
                  width={300}
                  height={200}
                  chartConfig={chartConfig}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="0"
                  center={[10, 0]}
                  absolute
                />
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Department:</Text>
                  <Text style={styles.detailValue}>{selectedStudent.department}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Batch:</Text>
                  <Text style={styles.detailValue}>{selectedStudent.batch}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Email:</Text>
                  <Text style={styles.detailValue}>{selectedStudent.email}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Phone:</Text>
                  <Text style={styles.detailValue}>{selectedStudent.phone}</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3E3D53',
    },
    header: {
      backgroundColor: '#5A4DBC',
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: 10,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    contentContainer: {
      padding: 16,
      flex: 1,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: '#DDDDDD',
      marginBottom: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    statLabel: {
      fontSize: 12,
      color: '#CCCCCC',
    },
    list: {
      paddingBottom: 20,
    },
    studentItem: {
      backgroundColor: '#4C4B63',
      padding: 12,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    studentInfo: {
      flex: 1,
    },
    studentName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    studentRollNo: {
      fontSize: 13,
      color: '#BBBBBB',
    },
    attendanceIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    lowAttendance: {
      backgroundColor: '#FF6384',
    },
    goodAttendance: {
      backgroundColor: '#4CAF50',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#3E3D53',
      padding: 20,
      borderRadius: 20,
      width: '90%',
    },
    closeButton: {
      alignSelf: 'flex-end',
      marginBottom: 10,
    },
    studentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
    },
    modalStudentName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    modalStudentRoll: {
      fontSize: 14,
      color: '#CCCCCC',
    },
    attendanceChartContainer: {
      marginBottom: 20,
      alignItems: 'center',
    },
    chartTitle: {
      fontSize: 16,
      color: '#FFFFFF',
      marginBottom: 10,
      fontWeight: 'bold',
    },
    detailsContainer: {
      borderTopWidth: 1,
      borderTopColor: '#555',
      paddingTop: 10,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    detailLabel: {
      color: '#AAAAAA',
      fontWeight: 'bold',
    },
    detailValue: {
      color: '#FFFFFF',
      flexShrink: 1,
      textAlign: 'right',
    },
  });  

export default AbsenteesScreen;
