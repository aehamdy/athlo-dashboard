import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  arabicText: {
    fontFamily: 'Cairo',
    direction: 'rtl',
    textAlign: 'right',
  },

  page: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 28,
    fontFamily: 'Cairo',
    fontSize: 11,
    color: '#111827',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  footer: {
    marginTop: 24,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },

  spaceY: {
    gap: 4,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  textCenter: {
    display: 'flex',
    justifyContent: 'center',
  },

  textBold: {
    fontWeight: 'bold',
  },

  mutedText: {
    color: '#6b7280',
  },

  title: {
    fontSize: 24,
  },

  sectionTitle: {
    fontSize: 13,
    marginBottom: 6,
  },

  billTo: {
    marginBottom: 2,
    fontWeight: 'bold',
  },

  // TABLE
  table: {
    width: '100%',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderBottomWidth: 0,
  },

  tableRow: {
    flexDirection: 'row',
    width: '100%',
  },

  th: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
  },

  td: {
    flex: 1,
    fontSize: 10,
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
  },

  totals: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  finalTotal: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },

  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: '#f3f4f6',
    fontSize: 9,
  },

  divider: {
    marginVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
});
