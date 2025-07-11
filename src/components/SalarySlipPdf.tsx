import { Document, View, Page, Text, StyleSheet } from "@react-pdf/renderer";
import { formatINROnlyCommas } from "../utils/formatters";

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#575757',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
    color: '#fff'
  },
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  sectionTitle: {
    fontSize: 12,
    padding: 5,
    backgroundColor: '#f7f7f7',

    marginTop: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase'

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    borderBottom: "1px solid #ccc",
    padding: 4
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 8
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  }
})

interface salaryType {
  label: string,
  amount: number
}

interface salarySlipType {
  totalCtc: number,
  earnings: salaryType[],
  deductions: salaryType[],
  summary: salaryType[],
  isMonthly: boolean

}

export const SalarySlipPdf = ({
  totalCtc,
  earnings,
  deductions,
  summary,
  isMonthly
}: salarySlipType) => {
  return (<Document>
    <Page style={styles.page}>
      <Text style={styles.heading}>
        CTC Calculator - Salary Breakdown
      </Text>

      <Text style={styles.label} >Total CTC: Rs. {formatINROnlyCommas(totalCtc)} {isMonthly ? 'per month' : 'per year'}</Text>
      <View style={styles.header}><Text>Component</Text> <Text>Amount</Text></View>

      <Text style={styles.sectionTitle}>Earnings</Text>
      {earnings.map((item, idx) => (
        <View style={styles.row} key={idx}>
          <Text>{item.label}</Text>
          <Text>Rs.{formatINROnlyCommas(item.amount)}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Deductions</Text>
      {deductions.map((item, idx) => (
        <View style={styles.row} key={idx}>
          <Text>{item.label}</Text>
          <Text>Rs.{formatINROnlyCommas(item.amount)}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Summary</Text>
      {
        summary.map((item, idx) => (
          <View style={styles.row} key={idx}>
            <Text>{item.label}</Text>
            <Text>Rs.{formatINROnlyCommas(item.amount)}</Text>
          </View>
        ))
      }


    </Page>
  </Document>
  );
}