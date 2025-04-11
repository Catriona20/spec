import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ClassScheduleScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const classes = [
    {
      time: '08:00 AM - 09:00 AM',
      courseCode: 'CS2343',
      courseName: 'Operating Systems',
      facultyName: 'Sangeetha',
      attendance: 'Absent',
    },
    {
      time: '09:15 AM - 10:15 AM',
      courseCode: 'CS2344',
      courseName: 'Database Management',
      facultyName: 'Priya Venkatesh',
      attendance: 'Present',
    },
    {
      time: '10:30 AM - 11:30 AM',
      courseCode: 'CS2345',
      courseName: 'Data Structures',
      facultyName: 'Rajesh Kumar N',
      attendance: 'Pending',
    },
  ];

  const handleNext = () => {
    if (currentIndex < classes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToAbsentees = () => {
    router.push('/abs');
  };

  const goToEngagement = () => {
    router.push('/engagement');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#5A4DBC" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, SHERYL KATRINA M</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Access Your Classes</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.navButton, { opacity: currentIndex === 0 ? 0.5 : 1 }]}
          onPress={handlePrev}
          disabled={currentIndex === 0}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.classCard}>
          <Text style={styles.timeText}>{classes[currentIndex].time}</Text>
          <View style={styles.divider} />
          <View style={styles.courseContainer}>
            <Text style={styles.courseCode}>{classes[currentIndex].courseCode}</Text>
            <Text style={styles.courseName}>{classes[currentIndex].courseName}</Text>
          </View>
          <View style={styles.facultyContainer}>
            <Text style={styles.facultyLabel}>Faculty Name:</Text>
            <Text style={styles.facultyName}>{classes[currentIndex].facultyName}</Text>
          </View>
          <View style={styles.attendanceContainer}>
            <Text style={styles.attendanceLabel}>Attendance:</Text>
            <Text
              style={[
                styles.attendanceStatus,
                classes[currentIndex].attendance === 'Present'
                  ? styles.presentText
                  : classes[currentIndex].attendance === 'Absent'
                  ? styles.absentText
                  : styles.pendingText,
              ]}
            >
              {classes[currentIndex].attendance}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.navButton, { opacity: currentIndex === classes.length - 1 ? 0.5 : 1 }]}
          onPress={handleNext}
          disabled={currentIndex === classes.length - 1}
        >
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.paginationContainer}>
        {classes.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, index === currentIndex && styles.activeDot]}
          />
        ))}
      </View>

      {/* Footer Icons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={goToAbsentees}>
          <Ionicons name="person" size={24} color="#5A4DBC" />
          <Text style={styles.footerButtonText}>Absentees</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={goToEngagement}>
          <Ionicons name="stats-chart" size={24} color="#5A4DBC" />
          <Text style={styles.footerButtonText}>Student Engagement</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2C2C39' },
  header: { backgroundColor: '#5A4DBC', padding: 16, alignItems: 'center' },
  greeting: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  titleContainer: { alignItems: 'center', paddingVertical: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navButton: {
    backgroundColor: '#5A4DBC',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classCard: {
    backgroundColor: '#3E3D53',
    borderRadius: 12,
    padding: 20,
    margin: 10,
    width: '75%',
    elevation: 5,
  },
  timeText: { fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#5A4DBC', marginVertical: 10 },
  courseContainer: { marginBottom: 12 },
  courseCode: { fontSize: 16, fontWeight: 'bold', color: '#5A4DBC' },
  courseName: { fontSize: 16, color: 'white', marginTop: 4 },
  facultyContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  facultyLabel: { fontSize: 15, color: '#9994C5', marginRight: 8 },
  facultyName: { fontSize: 15, color: '#00C853', fontWeight: '500' },
  attendanceContainer: { flexDirection: 'row', alignItems: 'center' },
  attendanceLabel: { fontSize: 15, color: '#9994C5', marginRight: 8 },
  attendanceStatus: { fontSize: 15, fontWeight: '500' },
  presentText: { color: '#00C853' },
  absentText: { color: '#F44336' },
  pendingText: { color: '#FFC107' },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6E6B94',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#5A4DBC',
    width: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#3E3D53',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerButton: { alignItems: 'center', justifyContent: 'center' },
  footerButtonText: { color: 'white', marginTop: 5, fontSize: 12 },
});

export default ClassScheduleScreen;
