import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { 
    padding: 45, 
    fontSize: 9, 
    fontFamily: 'Helvetica', 
    color: '#1e293b' 
  },
  // Professional Navy Accent
  sideAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: '#001F3F',
  },
  // Header section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    borderBottom: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 20,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001F3F',
    letterSpacing: 0.5,
  },
  brandSub: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 2,
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#001F3F',
    textAlign: 'right',
  },
  dateText: {
    fontSize: 9,
    color: '#64748b',
    textAlign: 'right',
    marginTop: 4,
  },
  // Billing Grid
  billingGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  infoGroup: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 7,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#001F3F',
    marginBottom: 5,
    letterSpacing: 1,
  },
  clientName: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  // Table 
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#001F3F',
    padding: 8,
    borderRadius: 2,
  },
  tableHeaderText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: 1,
    borderBottomColor: '#f1f5f9',
  },
  colDesc: { width: '75%' },
  colAmt: { width: '25%', textAlign: 'right' },
  
  // Totals & Banking Wrap
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  bankBox: {
    width: '50%',
    borderLeft: 2,
    borderLeftColor: '#001F3F',
    paddingLeft: 12,
    paddingVertical: 4,
  },
  bankTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#001F3F',
  },
  totalContainer: {
    width: '35%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTop: 2,
    borderTopColor: '#001F3F',
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#001F3F',
  },
  grandTotalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#001F3F',
  }
});

const InvoiceTemplate = ({ data }) => {
  const vatRate = 0.15;
  const subtotal = data.total / (1 + vatRate);
  const vatAmount = data.total - subtotal;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sideAccent} />
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>BOTH ENDS DEVELOPMENT</Text>
            <Text style={styles.brandSub}>mlangaviclyde@gmail.com</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.dateText}>Issued: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Client Info */}
        <View style={styles.billingGrid}>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>Bill To</Text>
            <Text style={styles.clientName}>{data.clientName}</Text>
            <Text style={{ color: '#64748b' }}>{data.clientEmail}</Text>
          </View>
          <View style={[styles.infoGroup, { textAlign: 'right' }]}>
            <Text style={styles.label}>Payment Terms</Text>
            <Text style={{ fontWeight: 'bold' }}>Due on Receipt</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colDesc]}>Description of Services</Text>
            <Text style={[styles.tableHeaderText, styles.colAmt]}>Amount</Text>
          </View>
          
          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colAmt}>R {parseFloat(item.amount).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Footer: Bank & Totals */}
        <View style={styles.footerSection}>
          <View style={styles.bankBox}>
            <Text style={styles.bankTitle}>PAYMENT INFORMATION</Text>
            <Text style={{ marginBottom: 2 }}>Bank: <Text style={{ fontWeight: 'bold' }}>Capitec</Text></Text>
            <Text style={{ marginBottom: 2 }}>Account: <Text style={{ fontWeight: 'bold' }}>MR LC MAKHUBELE</Text></Text>
            <Text style={{ marginBottom: 2 }}>Number: <Text style={{ fontWeight: 'bold' }}>2107941161</Text></Text>
          </View>

          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={{ color: '#64748b' }}>Subtotal</Text>
              <Text>R {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={{ color: '#64748b' }}>VAT (15%)</Text>
              <Text>R {vatAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>TOTAL DUE</Text>
              <Text style={styles.grandTotalValue}>R {data.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};

export default InvoiceTemplate;