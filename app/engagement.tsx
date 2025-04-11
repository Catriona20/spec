import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Gender = 'male' | 'female';
type Participation = 'High' | 'Medium' | 'Low' | 'Very Low';

type Student = {
  id: string;
  name: string;
  rollNo: string;
  gender: Gender;
  engagementScore: number;
  lastActive: string;
  participation: Participation;
};

const StudentEngagementScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'engaged' | 'disengaged'>('engaged');

  const engagedStudents: Student[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      rollNo: 'CS2021010',
      gender: 'male',
      engagementScore: 92,
      lastActive: '5 mins ago',
      participation: 'High'
    },
    {
      id: '2',
      name: 'Sarah Williams',
      rollNo: 'CS2021015',
      gender: 'female',
      engagementScore: 87,
      lastActive: '2 mins ago',
      participation: 'High'
    },
    {
      id: '3',
      name: 'David Chen',
      rollNo: 'CS2021022',
      gender: 'male',
      engagementScore: 79,
      lastActive: '8 mins ago',
      participation: 'Medium'
    },
    {
      id: '4',
      name: 'Olivia Martinez',
      rollNo: 'CS2021018',
      gender: 'female',
      engagementScore: 85,
      lastActive: '3 mins ago',
      participation: 'High'
    }
  ];

  const disengagedStudents: Student[] = [
    {
      id: '5',
      name: 'Ryan Thompson',
      rollNo: 'CS2021031',
      gender: 'male',
      engagementScore: 35,
      lastActive: '25 mins ago',
      participation: 'Low'
    },
    {
      id: '6',
      name: 'Emily Davis',
      rollNo: 'CS2021027',
      gender: 'female',
      engagementScore: 42,
      lastActive: '18 mins ago',
      participation: 'Low'
    },
    {
      id: '7',
      name: 'Kevin Singh',
      rollNo: 'CS2021033',
      gender: 'male',
      engagementScore: 28,
      lastActive: '30+ mins ago',
      participation: 'Very Low'
    }
  ];

  const renderStudentItem = ({ item }: { item: Student }) => (
    <View style={styles.studentItem}>
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
        <View style={styles.engagementDetails}>
          <Text style={styles.lastActiveText}>Last active: {item.lastActive}</Text>
          <View style={styles.participationContainer}>
            <Text style={styles.participationLabel}>Participation:</Text>
            <Text
              style={[
                styles.participationValue,
                item.participation === 'High'
                  ? styles.highParticipation
                  : item.participation === 'Medium'
                  ? styles.mediumParticipation
                  : item.participation === 'Low'
                  ? styles.lowParticipation
                  : styles.veryLowParticipation
              ]}
            >
              {item.participation}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        <Text
          style={[
            styles.engagementScore,
            item.engagementScore >= 75
              ? styles.highScore
              : item.engagementScore >= 50
              ? styles.mediumScore
              : styles.lowScore
          ]}
        >
          {item.engagementScore}%
        </Text>
      </View>
    </View>
  );

  const currentStudents = activeTab === 'engaged' ? engagedStudents : disengagedStudents;

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
        <Text style={styles.title}>Student Engagement</Text>
        <Text style={styles.subtitle}>Today's Class: 08:00 AM - 09:00 AM</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'engaged' && styles.activeTab]}
            onPress={() => setActiveTab('engaged')}
          >
            <Text style={[styles.tabText, activeTab === 'engaged' && styles.activeTabText]}>
              Engaged ({engagedStudents.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'disengaged' && styles.activeTab]}
            onPress={() => setActiveTab('disengaged')}
          >
            <Text style={[styles.tabText, activeTab === 'disengaged' && styles.activeTabText]}>
              Disengaged ({disengagedStudents.length})
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>32</Text>
            <Text style={styles.statLabel}>Total Students</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentStudents.length}</Text>
            <Text style={styles.statLabel}>
              {activeTab === 'engaged' ? 'Engaged' : 'Disengaged'}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statValue,
                activeTab === 'engaged' ? styles.highScore : styles.lowScore
              ]}
            >
              {activeTab === 'engaged' ? '78%' : '22%'}
            </Text>
            <Text style={styles.statLabel}>Percentage</Text>
          </View>
        </View>

        <FlatList
          data={currentStudents}
          renderItem={renderStudentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C39',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A4DBC',
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9994C5',
    textAlign: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#3E3D53',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#5A4DBC',
  },
  tabText: {
    fontSize: 16,
    color: '#9994C5',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#3E3D53',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5A4DBC',
  },
  statLabel: {
    fontSize: 12,
    color: '#9994C5',
    marginTop: 4,
  },
  list: {
    paddingBottom: 20,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3E3D53',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  studentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  studentRollNo: {
    fontSize: 14,
    color: '#9994C5',
    marginTop: 2,
  },
  engagementDetails: {
    marginTop: 4,
  },
  lastActiveText: {
    fontSize: 12,
    color: '#9994C5',
  },
  participationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  participationLabel: {
    fontSize: 12,
    color: '#9994C5',
    marginRight: 4,
  },
  participationValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  highParticipation: {
    color: '#4CAF50',
  },
  mediumParticipation: {
    color: '#FFC107',
  },
  lowParticipation: {
    color: '#FF9800',
  },
  veryLowParticipation: {
    color: '#F44336',
  },
  scoreContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  engagementScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  highScore: {
    color: '#4CAF50',
  },
  mediumScore: {
    color: '#FFC107',
  },
  lowScore: {
    color: '#F44336',
  },
});

export default StudentEngagementScreen;