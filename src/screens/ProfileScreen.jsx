import { View, Text, Image, StyleSheet } from 'react-native';
import { common } from '../styles/common';

export default function ProfileScreen() {
  return (
    <View style={common.screen}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://ui-avatars.com/api/?name=Yentl+Belaen&background=0a84ff&color=fff&size=256' }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <Text style={[common.title, { marginTop: 12 }]}>Yentl Belaen</Text>
        <Text style={styles.sub}>Student Programmeren</Text>
        <Text style={styles.sub}>yentl.belaen@student.vives.be</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.body}>
          I'm a student finalizing my degree of "Graduaat Programmeren" with a large interest in finance.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <Text style={styles.body}>Finance • Investing</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#eee',
  },
  sub: {
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 6,
  },
  body: {
    lineHeight: 20,
  },
});
